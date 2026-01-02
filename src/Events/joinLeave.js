const { ChannelType, AuditLogEvent, PermissionsBitField } = require('discord.js');
const config = require('../../config'); 

function isAccountRecent(user, days = 60) {
  const created = user?.createdAt ?? new Date(0);
  const ageMs = Date.now() - created.getTime();
  return ageMs < days * 24 * 60 * 60 * 1000;
}

function registerJoinLeave(client, context = {}) {
  const resolveChannelId = (guild) => {
    if (context && typeof context.joinLeaveChannelId === 'string') return context.joinLeaveChannelId;
    if (context && typeof context.joinLeaveChannelId === 'object') return context.joinLeaveChannelId[guild.id];
    return config?.channel?.joinLeave;
  };

  const getChannel = async (guild) => {
    try {
      const id = resolveChannelId(guild);
      if (!id) {
        console.warn(`[joinLeave] Aucun channel configuré pour ${guild.name} (${guild.id})`);
        return null;
      }

      const ch = guild.channels.cache.get(id)
        ?? await guild.channels.fetch(id).catch(() => null);
      if (!ch) return null;

      const ok = new Set([
        ChannelType.GuildText,
        ChannelType.GuildAnnouncement,
        ChannelType.PublicThread,
        ChannelType.PrivateThread,
        ChannelType.AnnouncementThread
      ]);

      return ok.has(ch.type) ? ch : null;
    } catch {
      return null;
    }
  };

  // (Optionnel) pour éviter de doubler un message "ban" + "remove"
  const recentBans = new Map(); // key: guildId:userId -> timestamp
  const banKey = (guildId, userId) => `${guildId}:${userId}`;

  // === JOIN ===
  client.on('guildMemberAdd', async (member) => {
    const channel = await getChannel(member.guild);
    if (!channel) return;

    const recent = isAccountRecent(member.user, 60);
    const baseMsg = `✅ **<@${member.id}>** a rejoint le serveur.`;
    const warn = recent ? `\n⚠️ **UTILISATEUR SUSPECT** ⚠️ Date de création de compte récente` : "";

    channel.send(baseMsg + warn).catch(err => console.error('[joinLeave] send add:', err));
  });

  // === BAN (fiable) ===
  client.on('guildBanAdd', async (ban) => {
    const guild = ban.guild;
    const user = ban.user;

    recentBans.set(banKey(guild.id, user.id), Date.now());

    const channel = await getChannel(guild);
    if (!channel) return;

    const tag = user?.tag || user?.username || user.id;
    channel.send(`🔨 **${tag}** a été **banni** du serveur.`)
      .catch(err => console.error('[joinLeave] send ban:', err));
  });

  // === LEAVE / KICK ===
  client.on('guildMemberRemove', async (member) => {
    const channel = await getChannel(member.guild);
    if (!channel) return;

    const tag = member.user?.tag || member.displayName || member.id;

    // Si on vient de voir un ban, on évite le doublon
    const key = banKey(member.guild.id, member.id);
    const banTs = recentBans.get(key);
    if (banTs && (Date.now() - banTs) < 10_000) {
      recentBans.delete(key);
      return;
    }

    // Détection du KICK via audit logs (si permissions)
    try {
      const me = member.guild.members.me
        ?? await member.guild.members.fetch(client.user.id).catch(() => null);

      const canViewAudit = me?.permissions?.has(PermissionsBitField.Flags.ViewAuditLog);
      if (canViewAudit) {
        const logs = await member.guild.fetchAuditLogs({
          type: AuditLogEvent.MemberKick,
          limit: 5,
        });

        // On cherche une entrée récente correspondant à ce member
        const entry = logs.entries.find(e =>
          e.target?.id === member.id &&
          (Date.now() - e.createdTimestamp) < 10_000 // 10s de tolérance
        );

        if (entry) {
          const mod = entry.executor ? `<@${entry.executor.id}>` : "un modérateur";
          await channel.send(`👢 **${tag}** a été **expulsé** du serveur par ${mod}.`);
          return;
        }
      }
    } catch (e) {
      // si audit logs non accessibles, on retombe en "a quitté"
      // console.error('[joinLeave] audit log check:', e);
    }

    // Fallback : départ volontaire
    channel.send(`🚪 **${tag}** a quitté le serveur.`)
      .catch(err => console.error('[joinLeave] send remove:', err));
  });

  console.log('[joinLeave] handlers enregistrés. Salon par défaut :', config?.channel?.joinLeave || '(non défini)');
}

registerJoinLeave.isAccountRecent = isAccountRecent;
registerJoinLeave.__register = true;
module.exports = registerJoinLeave;
