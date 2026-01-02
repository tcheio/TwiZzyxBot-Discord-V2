const { PermissionsBitField } = require('discord.js');
const joinLeave = require('./joinLeave');
const config = require('../../config');

function registerAutoRole(client) {
  const isAccountRecent = (user, days) => {
    if (typeof joinLeave.isAccountRecent === 'function') {
      return joinLeave.isAccountRecent(user, days);
    }
    const created = user?.createdAt ?? new Date(0);
    return (Date.now() - created.getTime()) < days * 24 * 60 * 60 * 1000;
  };

  const getRole = async (guild, roleIdOrName) => {
    if (!guild) return null;
    if (guild.roles.cache.size === 0) {
      await guild.roles.fetch().catch(() => {});
    }
    const byId = guild.roles.cache.get(roleIdOrName);
    if (byId) return byId;
    return guild.roles.cache.find(r => r.name === roleIdOrName) || null;
  };

  const canAssign = (me, role) => {
    if (!me.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      console.warn('[autorole] Permission MANAGE_ROLES manquante.');
      return false;
    }
    const cmp = me.roles.highest.comparePositionTo(role);
    if (cmp <= 0) {
      console.warn(`[autorole] Hiérarchie insuffisante: mon plus haut rôle (${me.roles.highest.name} pos=${me.roles.highest.position}) `
        + `<= rôle cible (${role.name} pos=${role.position}).`);
      return false;
    }
    return true;
  };

  const giveRole = async (member) => {
    try {
      if (member.user.bot) return;
      const recent = isAccountRecent(member.user, 60);
      const key = recent ? config?.roles?.recent : config?.roles?.member;
      if (!key) {
        console.warn(`[autorole] Rôle ${recent ? 'recent' : 'member'} non configuré.`);
        return;
      }
      const role = await getRole(member.guild, key);
      if (!role) {
        console.warn(`[autorole] Rôle introuvable: ${key} sur ${member.guild?.name} (${member.guild?.id})`);
        return;
      }
      const me = member.guild.members.me || await member.guild.members.fetch(client.user.id).catch(() => null);
      if (!me) return;

      if (!canAssign(me, role)) return;

      if (!member.roles.cache.has(role.id)) {
        await member.roles.add(role, recent ? 'Compte < 60 jours' : 'Autorole par défaut');
        console.log(`[autorole] ${member.user.tag} → rôle "${role.name}" (${recent ? 'recent' : 'member'})`);
      }
    } catch (e) {
      console.error('[autorole] erreur assignation:', e);
    }
  };

  // 1) Arrivée du membre
  client.on('guildMemberAdd', async (member) => {
    if (member.pending) {
      console.log(`[autorole] ${member.user.tag} en pending, en attente d'acceptation du règlement.`);
      return;
    }
    await giveRole(member);
  });

  // 2) Validation du règlement (pending -> false)
  client.on('guildMemberUpdate', async (oldMember, newMember) => {
    if (oldMember.pending && !newMember.pending) {
      await giveRole(newMember);
    }
  });

  console.log('[autorole] handler enregistré (autorole <60j).');
}

registerAutoRole.__register = true;
module.exports = registerAutoRole;
