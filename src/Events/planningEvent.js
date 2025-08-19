// src/Events/Planning/autoReactPlanning.js
const rules = require("../Donnees/planningEmoji");
const { PermissionsBitField } = require("discord.js");
const { channel } = require("../../config");

const PLANNING_CHANNEL_IDS = [channel.envoie];
const MIN_LEN = 60;          // on ne réagit que sur des blocs "planning"
const MIN_REACTIONS = 2;     // utilisé seulement en mode 3 réactions (planning initial)
const MAX_REACTIONS = 3;

// Priorité de groupes si "group" est fourni dans planningEmoji.js
const GROUP_PRIORITY = { game: 3, platform: 2, format: 1, generic: 0 };

// Émoji custom "sleep" pour absence
const SLEEP_EMOJI_ID = "1290987425857929267"; // <:twizzy12Sleep:1290987425857929267>

// -------------------- Utils --------------------
function normalize(s) {
  return (s || "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

/** Agrège {emoji -> {score, group}} depuis planningEmoji.js et le contenu */
function aggregateFromRules(content) {
  const txt = normalize(content);
  const aggregate = new Map();

  for (const r of rules) {
    const keys = Array.isArray(r.keys) ? r.keys : [];
    const hit = keys.some(k => txt.includes(normalize(k)));
    if (!hit) continue;

    const prev = aggregate.get(r.emoji);
    const group = (typeof r.group === "string") ? r.group : "generic";
    const base = (typeof r.score === "number") ? r.score : 1;

    if (!prev) {
      aggregate.set(r.emoji, { score: base, group });
    } else {
      // petit bonus si plusieurs mots-clés matchent le même emoji
      prev.score += base * 0.5;
    }
  }
  return aggregate;
}

/** Fallbacks construits uniquement à partir du fichier d’emojis */
function buildFallbackList() {
  const byEmoji = new Map();
  for (const r of rules) {
    const group = (typeof r.group === "string") ? r.group : "generic";
    const score = (typeof r.score === "number") ? r.score : 1;
    const cur = byEmoji.get(r.emoji);
    if (!cur) {
      byEmoji.set(r.emoji, { score, group });
    } else {
      // garde le meilleur score rencontré pour cet emoji
      if (score > cur.score) cur.score = score;
      cur.group = group;
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

/** Renvoie jusqu’à max emojis pertinents */
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

  // Fallbacks depuis le fichier si pas assez
  if (sorted.length < max) {
    const fallbacks = buildFallbackList();
    for (const f of fallbacks) {
      if (sorted.length >= max) break;
      if (!sorted.includes(f)) sorted.push(f);
    }
  }

  return sorted.slice(0, max);
}

// -------------------- Listener --------------------
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

      // Canal ciblé
      const channelOk = PLANNING_CHANNEL_IDS.length
        ? PLANNING_CHANNEL_IDS.includes(message.channel.id)
        : (message.channel.name?.toLowerCase?.().includes("planning"));

      if (!channelOk) return;
      if ((message.content || "").length < MIN_LEN) return;

      // Permissions
      const me = await message.guild.members.fetchMe();
      const perms = message.channel.permissionsFor(me);
      if (!perms?.has(PermissionsBitField.Flags.AddReactions)) return;

      // Détermination du type de message
      const isEveryone = message.mentions?.everyone === true;

      if (isEveryone) {
        // --- PLANNING INITIAL : 3 réactions ---
        const emojis = pickEmojis(message.content, MAX_REACTIONS);

        let count = 0;
        for (const e of emojis) {
          if (count >= MAX_REACTIONS) break;
          try { await message.react(e); count++; } catch {}
        }

        // Filet de sécurité (rarement utile)
        if (count < MIN_REACTIONS) {
          const fb = buildFallbackList();
          for (const e of fb) {
            if (count >= MIN_REACTIONS) break;
            if (emojis.includes(e)) continue;
            try { await message.react(e); count++; } catch {}
          }
        }
      } else {
        // --- CHANGEMENT DE PROGRAMME : 1 réaction ---
        const txt = normalize(message.content);

        // Cas spécial absence → émoji custom "sleep"
        if (/\b(off|absent|pas la|pas là)\b/.test(txt)) {
          try { await message.react(SLEEP_EMOJI_ID); } catch {}
          return;
        }

        // Sinon, 1 émoji pertinent depuis le fichier
        const [emoji] = pickEmojis(message.content, 1);
        if (!emoji) return;

        try { await message.react(emoji); } catch {}
      }
    } catch (err) {
      console.error("[autoReactPlanning] ", err);
    }
  },
};
