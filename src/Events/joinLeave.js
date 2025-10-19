// src/Events/joinLeave.js
const { ChannelType } = require('discord.js');
const config = require('../../config'); // adapte le chemin si besoin


function registerJoinLeave(client, context = {}) {
  const resolveChannelId = (guild) => {
    // autorise aussi un mapping par guilde si un jour tu veux : { [guildId]: channelId }
    if (context && typeof context.joinLeaveChannelId === 'string') return context.joinLeaveChannelId;
    if (context && typeof context.joinLeaveChannelId === 'object') return context.joinLeaveChannelId[guild.id];
    return config?.channel?.joinLeave; // <- ta config
  };

  const getChannel = async (guild) => {
    try {
      const id = resolveChannelId(guild);
      if (!id) {
        console.warn(`[joinLeave] Aucun channel configuré pour ${guild.name} (${guild.id})`);
        return null;
      }
      const ch = guild.channels.cache.get(id) ?? await guild.channels.fetch(id).catch(() => null);
      if (!ch) {
        console.warn(`[joinLeave] Channel introuvable: ${id} sur ${guild.name} (${guild.id})`);
        return null;
      }
      const ok = new Set([
        ChannelType.GuildText,
        ChannelType.GuildAnnouncement,
        ChannelType.PublicThread,
        ChannelType.PrivateThread,
        ChannelType.AnnouncementThread
      ]);
      if (!ok.has(ch.type)) {
        console.warn(`[joinLeave] Type de canal non supporté (${ch.type}) pour ${id}`);
        return null;
      }
      return ch;
    } catch (e) {
      console.error('[joinLeave] getChannel error:', e);
      return null;
    }
  };

  client.on('guildMemberAdd', async (member) => {
    const channel = await getChannel(member.guild);
    if (!channel) return;
    const tag = member.user?.tag || member.displayName || member.id;
    channel.send(`✅ **<@${member.id}>** a rejoint le serveur.`)
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

registerJoinLeave.__register = true; // pour ton loader
module.exports = registerJoinLeave;
