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

  const getRole = (guild, roleIdOrName) => {
    if (!guild) return null;
    const byId = guild.roles.cache.get(roleIdOrName);
    if (byId) return byId;
    return guild.roles.cache.find(r => r.name === roleIdOrName) || null;
  };

  client.on('guildMemberAdd', async (member) => {
    try {
      const recent = isAccountRecent(member.user, 60);

      const memberRoleKey = config?.roles?.member;
      const recentRoleKey = config?.roles?.recent;

      if (!memberRoleKey && !recentRoleKey) {
        console.warn('[autorole] Aucun rôle configuré (config.roles.member / config.roles.recent)');
        return;
      }

      // Choix du rôle
      const targetKey = recent ? recentRoleKey : memberRoleKey;
      if (!targetKey) {
        console.warn(`[autorole] Rôle manquant pour ${recent ? 'recent' : 'member'}`);
        return;
      }

      const role = getRole(member.guild, targetKey);
      if (!role) {
        console.warn(`[autorole] Rôle introuvable: ${targetKey} sur ${member.guild?.name} (${member.guild?.id})`);
        return;
      }

      // Vérifs basiques de permission/hiérarchie
      const me = member.guild.members.me || await member.guild.members.fetch(client.user.id).catch(() => null);
      if (!me) return;

      if (!me.permissions.has('ManageRoles')) {
        console.warn('[autorole] Le bot n’a pas la permission MANAGE_ROLES.');
        return;
      }

      if (me.roles.highest.comparePositionTo(role) <= 0) {
        console.warn(`[autorole] Rôle ${role.name} au-dessus/égal au rôle du bot — impossible d’assigner.`);
        return;
      }

      // Assignation (évite de re-assigner si déjà présent)
      if (!member.roles.cache.has(role.id)) {
        await member.roles.add(role, recent ? 'Compte < 60 jours' : 'Autorole par défaut');
        console.log(`[autorole] ${member.user.tag} → ajouté rôle "${role.name}" (${recent ? 'recent' : 'member'})`);
      }
    } catch (e) {
      console.error('[autorole] erreur sur guildMemberAdd:', e);
    }
  });

  console.log('[autorole] handler enregistré (autorole à 60 jours).');
}

registerAutoRole.__register = true; // pour ton loader
module.exports = registerAutoRole;
