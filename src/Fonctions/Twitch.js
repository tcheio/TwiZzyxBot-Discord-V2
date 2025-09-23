const contentMap = require('../Donnees/contentMap');

function testTitre(msg) {
  return msg.split('|')[0].trim();
}

function maxIntent(tab) {
  let max = -1;
  let maxres = -Infinity;
  for (let i = 0; i < tab.length; i++) {
    if (tab[i] > maxres) {
      max = i;
      maxres = tab[i];
    }
  }
  return String(max);
}

function pickValidKey(preferred = []) {
  const keys = Object.keys(contentMap);
  if (keys.length === 0) return 'default';
  for (const k of preferred) if (k && contentMap[k]) return k;
  if (contentMap['default']) return 'default';
  if (contentMap['mc']) return 'mc';
  return keys[0];
}

function analyseTitre(titre, jeu) {
  const titleWords = titre.toLowerCase().split(/\s+/).filter(Boolean);
  const jeuLower = (jeu || '').toLowerCase();

  if (jeu === 'Minecraft') {
    const scores = {};
    for (const [key, data] of Object.entries(contentMap)) {
      if (!data || !Array.isArray(data.keywords) || data.keywords.length === 0) continue;
      let s = 0;
      for (const w of titleWords) if (data.keywords.includes(w)) s++;
      if (s > 0) scores[key] = s;
    }
    const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
    return best ? best[0] : pickValidKey(['mc']);
  }

  const pref = [];
  if (jeuLower.includes('pokémon') || jeuLower.includes('pokemon')) pref.push('pkm');
  if (jeuLower.includes('mario kart')) pref.push('mk');
  if (jeuLower.includes('inazuma')) pref.push('ie');
  if (jeuLower.includes('among us')) pref.push('among');
  if (jeuLower.includes('mario')) pref.push('mario');

  return pickValidKey(pref);
}

function createDesc(indice) {
  const key = contentMap[indice] ? indice : pickValidKey(['default', 'mc']);
  const labels = {
    klk: 'Kill la Kill (UHC ?)',
    lg: 'Loup-Garou (UHC ?)',
    among: 'Among Us',
    pkm: 'Pokémon',
    mk: 'Mario Kart',
    mario: 'Mario',
    ie: 'Inazuma Eleven',
    mc: 'Minecraft',
    uhc: 'UHC',
    default: 'le live du soir'
  };

  const phrases = [
    ' ',
    'Mais non, on va pas jouer à ',
    'Que du plaisir avec ',
    "J'adore ",
    'Disasterclass in coming sur ',
    'On se pose sur '
  ];
  const rand = phrases[Math.floor(Math.random() * phrases.length)];
  const label = labels[key] || labels.default;

  // Si ça ressemble déjà à une phrase “complète”, renvoie tel quel (au cas où tu passes une phrase)
  if (/^(on se fait|toujours|l'ultra|des cubes|on se pose|mais non|j'adore|que du|disasterclass)/i.test(label)) {
    return label;
  }
  return rand + label;
}

function chercheJeu(msg) {
  const splitIndex = msg.indexOf('/');
  if (splitIndex === -1) return '';
  return msg.slice(splitIndex + 1).trim();
}

function minia(indice) {
  const id = String(indice).toLowerCase();
  let entry = contentMap[id];
  if (!entry || !Array.isArray(entry.minias) || entry.minias.length === 0) {
    entry = contentMap['default'];
  }
  if (!entry || !Array.isArray(entry.minias) || entry.minias.length === 0) {
    for (const v of Object.values(contentMap)) {
      if (v && Array.isArray(v.minias) && v.minias.length > 0) return v.minias[0];
      if (v && Array.isArray(v.minia) && v.minia.length > 0) return v.minia[0];
    }
    return null;
  }
  const r = Math.floor(Math.random() * entry.minias.length);
  return entry.minias[r];
}

module.exports = {
  testTitre,
  maxIntent,
  analyseTitre,
  createDesc,
  chercheJeu,
  minia,
};
