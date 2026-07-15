const { PermissionsBitField } = require("discord.js");
const config = require("../../config");
const { normalize, pickEmojis, buildFallbackList } = require("../Fonctions/AutoEmoji");

const PLANNING_CHANNEL_IDS = Array.isArray(config.channel.planning) ? config.channel.planning : [];
const MIN_LEN = 60;
const MIN_REACTIONS = 2;
const MAX_REACTIONS = 3;
const SLEEP_EMOJI_ID = "1284835963901710336"; // :Twizzyxsleep:

module.exports = {
  name: "messageCreate",
  once: false,
  /**
   * @param {import('discord.js').Message} message
   * @param {import('discord.js').Client} client
   */
  async execute(message, client) {
    try {
      if (!message.guild || message.author.bot) return;

      const channelOk = PLANNING_CHANNEL_IDS.length
        ? PLANNING_CHANNEL_IDS.includes(message.channel.id)
        : (message.channel.name?.toLowerCase?.().includes("planning"));

      if (!channelOk) return;
      if ((message.content || "").length < MIN_LEN) return;

      // Permissions
      const me = await message.guild.members.fetchMe();
      const perms = message.channel.permissionsFor(me);
      if (!perms?.has(PermissionsBitField.Flags.AddReactions)) return;

      const isEveryone = message.mentions?.everyone === true;

      if (isEveryone) {
        const emojis = pickEmojis(message.content, MAX_REACTIONS);

        let count = 0;
        for (const e of emojis) {
          if (count >= MAX_REACTIONS) break;
          try { await message.react(e); count++; } catch {}
        }

        if (count < MIN_REACTIONS) {
          const fb = buildFallbackList();
          for (const e of fb) {
            if (count >= MIN_REACTIONS) break;
            if (emojis.includes(e)) continue;
            try { await message.react(e); count++; } catch {}
          }
        }
      } else {
        const txt = normalize(message.content);

        if (/\b(off|absent|pas la|pas là)\b/.test(txt)) {
          try { await message.react(SLEEP_EMOJI_ID); } catch {}
          return;
        }

        const [emoji] = pickEmojis(message.content, 1);
        if (!emoji) return;

        try { await message.react(emoji); } catch {}
      }
    } catch (err) {
      console.error("[autoReactPlanning] ", err);
    }
  },
};
