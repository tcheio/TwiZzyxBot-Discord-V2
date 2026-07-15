const rules = require("../Donnees/planningEmoji");
const { PermissionsBitField } = require("discord.js");
const config  = require("../../config");

const PLANNING_CHANNEL_IDS = Array.isArray(config.channel.planning) ? config.channel.planning : [];
const MIN_LEN = 60;
const MIN_REACTIONS = 2;
const MAX_REACTIONS = 3;

// "custom" = émotes personnalisées TwiZzyx, toujours prioritaires sur le reste.
const GROUP_PRIORITY = { custom: 4, game: 3, platform: 2, format: 1, generic: 0 };
const SLEEP_EMOJI_ID = "1284835963901710336"; // :Twizzyxsleep:

function normalize(s) {
  return (s || "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Pré-compilation des regex à mot entier (une fois au chargement du module) :
// évite qu'une clé courte comme "jeu" ne matche à tort "jeudi", ou "top" dans un mot plus long,
// et évite de refaire ce travail à chaque message reçu (perf).
const compiledRules = rules.map(r => ({
  emoji: r.emoji,
  score: (typeof r.score === "number") ? r.score : 1,
  group: (typeof r.group === "string") ? r.group : "generic",
  matchers: (Array.isArray(r.keys) ? r.keys : [])
    .map(k => new RegExp(`(?<![a-z0-9])${escapeRegex(normalize(k))}(?![a-z0-9])`, "i")),
}));

function aggregateFromRules(content) {
  const txt = normalize(content);
  const aggregate = new Map();

  for (const r of compiledRules) {
    const hit = r.matchers.some(re => re.test(txt));
    if (!hit) continue;

    const prev = aggregate.get(r.emoji);
    if (!prev) {
      aggregate.set(r.emoji, { score: r.score, group: r.group });
    } else {
      prev.score += r.score * 0.5;
    }
  }
  return aggregate;
}

function buildFallbackList() {
  const byEmoji = new Map();
  for (const r of compiledRules) {
    const cur = byEmoji.get(r.emoji);
    if (!cur) {
      byEmoji.set(r.emoji, { score: r.score, group: r.group });
    } else {
      if (r.score > cur.score) cur.score = r.score;
      cur.group = r.group;
    }
  }

  return [...byEmoji.entries()]
    .sort((a, b) => {
      const ga = GROUP_PRIORITY[a[1].group] ?? 0;
      const gb = GROUP_PRIORITY[b[1].group] ?? 0;
      if (gb !== ga) return gb - ga;
      if (b[1].score !== a[1].score) return b[1].score - a[1].score;
      return a[0].localeCompare(b[0]);
    })
    .map(([emoji]) => emoji);
}

function pickEmojis(content, max = 3) {
  const aggregate = aggregateFromRules(content);

  const sorted = [...aggregate.entries()]
    .sort((a, b) => {
      const ga = GROUP_PRIORITY[a[1].group] ?? 0;
      const gb = GROUP_PRIORITY[b[1].group] ?? 0;
      if (gb !== ga) return gb - ga;
      if (b[1].score !== a[1].score) return b[1].score - a[1].score;
      return a[0].localeCompare(b[0]);
    })
    .map(([emoji]) => emoji);

  if (sorted.length < max) {
    const fallbacks = buildFallbackList();
    for (const f of fallbacks) {
      if (sorted.length >= max) break;
      if (!sorted.includes(f)) sorted.push(f);
    }
  }

  return sorted.slice(0, max);
}

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
