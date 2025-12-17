const { ChannelType } = require('discord.js');
const config = require('../../config'); 

// Détection compte récent (par défaut : 30 jours)
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

  // === JOIN ===
  client.on('guildMemberAdd', async (member) => {
    const channel = await getChannel(member.guild);
    if (!channel) return;

    const tag = member.user?.tag || member.displayName || member.id;

    const recent = isAccountRecent(member.user, 60);

    const baseMsg = `✅ **<@${member.id}>** a rejoint le serveur.`;

    const warn = recent
      ? `\n⚠️ **UTILISATEUR SUSPECT** ⚠️ Date de création de compte récente`
      : "";

    channel.send(baseMsg + warn)
      .catch(err => console.error('[joinLeave] send add:', err));
  });

  client.on('guildMemberRemove', async (member) => {
    const channel = await getChannel(member.guild);
    if (!channel) return;

    const tag = member.user?.tag || member.displayName || member.id;

    channel.send(`❌ **${tag}** a quitté le serveur.`)
      .catch(err => console.error('[joinLeave] send remove:', err));
  });

  console.log('[joinLeave] handlers enregistrés. Salon par défaut :', config?.channel?.joinLeave || '(non défini)');
}

registerJoinLeave.isAccountRecent = isAccountRecent;

registerJoinLeave.__register = true;
module.exports = registerJoinLeave;
