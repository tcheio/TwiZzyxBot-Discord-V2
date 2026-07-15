const rules = require("../Donnees/planningEmoji");

// "custom" = émotes personnalisées TwiZzyx, toujours prioritaires sur le reste.
const GROUP_PRIORITY = { custom: 4, game: 3, platform: 2, format: 1, generic: 0 };

function normalize(s) {
  return (s || "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Pré-compilation des regex à mot entier (une fois au chargement du module) :
// évite qu'une clé courte comme "jeu" ne matche à tort "jeudi", et évite de
// refaire ce travail à chaque message reçu (perf).
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

function fallbackCandidates() {
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
  return byEmoji;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Regroupe les candidats par palier (priorité de groupe, puis score) et mélange
// aléatoirement chaque palier : à score égal, l'ordre change à chaque appel.
function rankByTier(entries) {
  const tiers = new Map(); // "gp:score" -> { gp, score, emojis: [] }
  for (const [emoji, info] of entries) {
    const gp = GROUP_PRIORITY[info.group] ?? 0;
    const key = `${gp}:${info.score}`;
    if (!tiers.has(key)) tiers.set(key, { gp, score: info.score, emojis: [] });
    tiers.get(key).emojis.push(emoji);
  }
  return [...tiers.values()]
    .sort((a, b) => (b.gp - a.gp) || (b.score - a.score))
    .flatMap(tier => shuffle(tier.emojis));
}

function buildFallbackList() {
  return rankByTier([...fallbackCandidates().entries()]);
}

/**
 * Choisit jusqu'à `max` émotes en fonction du contexte, meilleur score/priorité
 * d'abord. En cas d'égalité de score, l'ordre est aléatoire. Complète avec le
 * pool de secours si le nombre de matches est insuffisant.
 */
function pickEmojis(content, max = 3) {
  const aggregate = aggregateFromRules(content);
  const ranked = rankByTier([...aggregate.entries()]);

  if (ranked.length < max) {
    for (const f of buildFallbackList()) {
      if (ranked.length >= max) break;
      if (!ranked.includes(f)) ranked.push(f);
    }
  }

  return ranked.slice(0, max);
}

/**
 * Choisit une seule émote : la meilleure trouvée par contexte, ou une émote
 * du pool de secours (choisie aléatoirement) si rien ne correspond.
 */
function pickBestEmoji(content) {
  const [best] = pickEmojis(content, 1);
  return best || null;
}

module.exports = {
  GROUP_PRIORITY,
  normalize,
  aggregateFromRules,
  buildFallbackList,
  pickEmojis,
  pickBestEmoji,
};
