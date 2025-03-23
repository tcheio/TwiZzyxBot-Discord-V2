const contentMap = require('../Donnees/contentMap');

function testTitre(msg) {
    return msg.split('|')[0].trim();
}


function maxIntent(tab){
    max = -1;
    maxres = 0;
    for (i=0; i<tab.length;i++){
        if (tab[i] > maxres){
            max = i;
            maxres = tab[i];
        }
    }
    return max.toString();
}

function analyseTitre(titre, jeu) {
    const titleWords = titre.toLowerCase().split(" ");
    let scores = {};
  
    // Si Minecraft → on fait l’analyse par mots-clés
    if (jeu === "Minecraft") {
      for (const [key, data] of Object.entries(contentMap)) {
        if (!data.keywords || data.keywords.length === 0) continue;
        scores[key] = 0;
        for (const word of titleWords) {
          if (data.keywords.includes(word)) {
            scores[key]++;
          }
        }
      }
  
      const bestMatch = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
      return bestMatch && bestMatch[1] > 0 ? bestMatch[0] : "MC";
    }
  
    // Pour les jeux non-Minecraft, on matche par nom direct
    const jeubis = jeu.split(" ");
    const jeuLower = jeu.toLowerCase();
  
    if (jeuLower.includes("pokémon")) return "pkm";
    if (jeuLower.includes("mario kart")) return "mk";
    if (jeuLower.includes("inazuma")) return "IE";
    if (jeuLower.includes("among us")) return "among";
    if (jeuLower.includes("yu-gi-oh")) return "ygo";
    if (jeuLower.includes("mario")) return "mario";
  
    return "autre";
  }

function createDesc(indice) {
    const phrases = [
        " ",
        "Mais non, on va pas jouer à ",
        "Que du plaisir avec ",
        "J'adore ",
        "Disasterclass in coming sur ce ",
        "On se pose sur"
    ];

    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

    const descMap = {
        "0": "KLK",
        "1": "LG",
        "2": "Naruto",
        "3": "DS",
        "6": "AOT",
        "7": "The Boys",
        "8": "Sky Defender",
        "9": "FMA",
        "10": "Eigthy-Six",
        "11": "Death Note",
        "12": "JJK",
        "13": "Dawa ou FDP",
        "14": "Madoka",
        "15": "HxH",
        "16": "Bleach",
        "17": "Fast Band",
        "18": "Industrial Craft",
        "19": "Evangelion",
        "20": "Konosuba",
        "21": "L'Ultra HardCore Minecraft est sorti avant Fortnite",
        "22": "Toujours plus de survie",
        "23": " Minecraft",
        "pkm": " Pokémon",
        "wiiSport": " Wii Sport",
        "batman": " Batman",
        "mk": " Mario Kart",
        "IE": " Inazuma Eleven",
        "among": " Among Us",
        "ygo": " Yu-Gi-Oh!",
        "spidey": " Spiderman",
        "lyoko": " Code Lyoko",
        "mario": "Mario",
        "MC": " Minecraft"
    };

    const desc = descMap[indice];

    if (!desc) {
        return "On se fait un stream tranquille en détente";
    }

    // Si la phrase est déjà complète (commence par "On se fait", "Toujours", etc.)
    if (/^(On se fait|Toujours|L'Ultra|Des cubes|On se pose|Mais non|J'adore|Que du|Disasterclass)/.test(desc)) {
        return desc;
    }

    // Sinon, construire la phrase aléatoire
    return randomPhrase + desc;
}

function chercheJeu(msg) {
    const splitIndex = msg.indexOf("/");
    
    if (splitIndex === -1) {
        console.warn("Pattern `)/` non trouvé dans le message.");
        return ""; // ou un fallback genre "Inconnu"
    }

    const jeu = msg.slice(splitIndex + 1).trim();
    return jeu;
}

function minia(indice) {
    const id = indice.toLowerCase();
    const entry = contentMap[id] || contentMap["default"];
  
    if (!entry.minias || entry.minias.length === 0) {
      return contentMap["default"].minias[0];
    }
  
    const rand = Math.floor(Math.random() * entry.minias.length);
    return entry.minias[rand];
  }
  

module.exports = {
    testTitre,
    maxIntent,
    analyseTitre,
    createDesc,
    chercheJeu,
    minia,
}