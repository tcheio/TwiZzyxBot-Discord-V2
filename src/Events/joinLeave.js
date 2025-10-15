// src/Events/joinLeave.js
const { ChannelType } = require('discord.js');

function registerJoinLeave(client, { joinLeaveChannelId } = {}) {
  if (!joinLeaveChannelId) {
    console.warn('[joinLeave] joinLeaveChannelId manquant');
    return;
  }

  const getChannel = async (guild) => {
    const ch = guild.channels.cache.get(joinLeaveChannelId)
      ?? await guild.channels.fetch(joinLeaveChannelId).catch(() => null);
    if (!ch) return null;
    const ok = new Set([
      ChannelType.GuildText, ChannelType.GuildAnnouncement,
      ChannelType.PublicThread, ChannelType.PrivateThread, ChannelType.AnnouncementThread
    ]);
    return ok.has(ch.type) ? ch : null;
  };

  client.on('guildMemberAdd', async (member) => {
    const channel = await getChannel(member.guild);
    if (!channel) return;
    const tag = member.user?.tag || member.displayName || member.id;
    channel.send(`✅ **<@${member.id}>** a rejoint le serveur.`)
      .catch(console.error);
  });

  client.on('guildMemberRemove', async (member) => {
    const channel = await getChannel(member.guild);
    if (!channel) return;
    const tag = member.user?.tag || member.displayName || member.id;
    channel.send(`❌ **${tag}** a quitté le serveur.`)
      .catch(console.error);
  });
}

registerJoinLeave.__register = true;
module.exports = registerJoinLeave;
