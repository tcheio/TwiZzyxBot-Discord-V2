// src/Events/Planning/autoReactPlanning.js
const rules = require("../Donnees/planningEmoji"); // ← chemin corrigé
const { PermissionsBitField } = require("discord.js");
const { channel } = require("../../config");

const PLANNING_CHANNEL_IDS = [channel.envoie];
const MIN_LEN = 60;
const MIN_REACTIONS = 2;
const MAX_REACTIONS = 3;

// Priorité des groupes (si "group" est fourni dans planningEmoji.js)
const GROUP_PRIORITY = { game: 3, platform: 2, format: 1, generic: 0 };

function normalize(s) {
  return (s || "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

/**
 * Construit une map {emoji -> {score, group}}
 * à partir des règles et du contenu du message.
 */
function aggregateFromRules(content) {
  const txt = normalize(content);
  const aggregate = new Map();

  for (const r of rules) {
    // r = { emoji, score, keys, group? }
    const hit = (r.keys || []).some(k => txt.includes(normalize(k)));
    if (!hit) continue;

    const prev = aggregate.get(r.emoji);
    const group = (r.group && typeof r.group === "string") ? r.group : "generic";
    if (!prev) {
      aggregate.set(r.emoji, { score: r.score || 1, group });
    } else {
      // bonus léger si plusieurs mots matchent la même émoji
      prev.score += (r.score || 1) * 0.5;
    }
  }
  return aggregate;
}

/**
 * Calcule une liste de fallback à partir du fichier d’emojis uniquement,
 * triée par (group priority desc, score desc, emoji alpha).
 */
function buildFallbackList() {
  const byEmoji = new Map();
  for (const r of rules) {
    const group = (r.group && typeof r.group === "string") ? r.group : "generic";
    const cur = byEmoji.get(r.emoji);
    if (!cur) {
      byEmoji.set(r.emoji, { score: r.score || 1, group });
    } else {
      // garde le meilleur score rencontré pour cet emoji
      if ((r.score || 1) > cur.score) cur.score = (r.score || 1);
      cur.group = group; // dernier group défini fait foi, ou "generic"
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

function pickEmojis(content) {
  const aggregate = aggregateFromRules(content);

  // Tri principal selon les priorités de groupe (si présentes) puis score
  const sorted = [...aggregate.entries()]
    .sort((a, b) => {
      const ga = GROUP_PRIORITY[a[1].group] ?? 0;
      const gb = GROUP_PRIORITY[b[1].group] ?? 0;
      if (gb !== ga) return gb - ga;
      if (b[1].score !== a[1].score) return b[1].score - a[1].score;
      return a[0].localeCompare(b[0]);
    })
    .map(([emoji]) => emoji);

  // Fallbacks issus du fichier d’emojis (pas de listes en dur)
  if (sorted.length < MAX_REACTIONS) {
    const fallbacks = buildFallbackList();
    for (const f of fallbacks) {
      if (sorted.length >= MAX_REACTIONS) break;
      if (!sorted.includes(f)) sorted.push(f);
    }
  }

  return sorted.slice(0, MAX_REACTIONS);
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

      const me = await message.guild.members.fetchMe();
      const perms = message.channel.permissionsFor(me);
      if (!perms?.has(PermissionsBitField.Flags.AddReactions)) return;

      const emojis = pickEmojis(message.content);

      let count = 0;
      for (const e of emojis) {
        if (count >= MAX_REACTIONS) break;
        try { await message.react(e); count++; } catch {}
      }

      // Sécurité: si < 2 réactions, on reprend la fallback list (toujours depuis le fichier)
      if (count < MIN_REACTIONS) {
        const fallbacks = buildFallbackList();
        for (const e of fallbacks) {
          if (count >= MIN_REACTIONS) break;
          if (emojis.includes(e)) continue; // évite doublon
          try { await message.react(e); count++; } catch {}
        }
      }
    } catch (err) {
      console.error("[autoReactPlanning] ", err);
    }
  },
};
