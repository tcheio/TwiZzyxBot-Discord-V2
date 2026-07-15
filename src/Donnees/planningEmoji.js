module.exports = [
  // ===================================================================
  // ÉMOTES PERSONNALISÉES TWIZZYX (PRIORITÉ ABSOLUE - group "custom")
  // ===================================================================
  { emoji: "<:Twizzyxlove:1284835969497038952>", score: 3.5, group: "custom", keys: ["love", "j'adore", "jadore", "coup de coeur"] },
  { emoji: "<:Twizzyxgg:1284835968029036565>", score: 3.5, group: "custom", keys: ["gg", "bien joue", "bien joué", "victoire", "gagne", "gagné"] },
  { emoji: "<:TwizzyxRage:1284835965835415616>", score: 3.5, group: "custom", keys: ["rage", "enerve", "énervé", "colere", "colère", "tilt"] },
  { emoji: "<:Twizzyxcry:1284835959392829542>", score: 3.5, group: "custom", keys: ["triste", "pleure", "snif"] },
  { emoji: "<:Twizzyxbatman:1284835962232246283>", score: 3.5, group: "custom", keys: ["batman"] },
  { emoji: "<:content:1229538543282688000>", score: 3.0, group: "custom", keys: ["content", "heureux", "trop bien", "hate de", "hâte de"] },
  { emoji: "<:TwiZzyxYes:1135686224372301826>", score: 3.0, group: "custom", keys: ["present", "présent", "dispo", "j'y serai", "jy serai"] },
  { emoji: "<:TwiZzyxEvans:1203786025680502804>", score: 3.6, group: "custom", keys: ["mark evans", "evans"] },
  // Pas d'ancrage lexical fiable -> réservées au pool de secours (buildFallbackList),
  // toujours prioritaires (group "custom") sans jamais déclencher sur un faux mot-clé.
  { emoji: "<:Twizzyxyo:1284835960869097492>", score: 3.0, group: "custom", keys: [] },
  { emoji: "<:TwiZzyxNo:1135686219796316340>", score: 3.0, group: "custom", keys: [] },
  { emoji: "<:arcaDebile:1503021340305785065>", score: 3.0, group: "custom", keys: ["miraculous", "react"] },

  // ===================================================================
  // PERSONNAGES INAZUMA ELEVEN (custom)
  // ===================================================================
  { emoji: "<:mark:1411974717946200064>", score: 3.2, group: "custom", keys: ["mark evans", "mark", "inazuma", "eleven", "inazuma eleven", "ie"] },
  { emoji: "<:axel:1411974715517702236>", score: 3.2, group: "custom", keys: ["axel blaze", "axel", "inazuma", "eleven", "inazuma eleven", "ie"] },
  { emoji: "<:jude:1411975187695538279>", score: 3.2, group: "custom", keys: ["jude sharp", "jude", "inazuma", "eleven", "inazuma eleven", "ie"] },
  { emoji: "<:shawn:1411974712564650087>", score: 3.2, group: "custom", keys: ["shawn frost", "shawn", "inazuma", "eleven", "inazuma eleven", "ie"] },
  { emoji: "<:Victor:1411976216214507622>", score: 3.2, group: "custom", keys: ["victor", "inazuma", "eleven", "inazuma eleven", "ie", "go"] },
  { emoji: "<:ricardo:1411976213496332399>", score: 3.2, group: "custom", keys: ["ricardo", "inazuma", "eleven", "inazuma eleven", "ie", "go"] },
  { emoji: "<:arion:1411976218886012979>", score: 3.2, group: "custom", keys: ["arion", "inazuma", "eleven", "inazuma eleven", "ie", "go"] },
  { emoji: "<:unmei:1411976714116009994>", score: 3.2, group: "custom", keys: ["unmei", "inazuma", "eleven", "inazuma eleven", "ie"] },
  { emoji: "<:ASUTO:1465025598463148155>", score: 3.2, group: "custom", keys: ["asuto", "inazuma", "eleven", "inazuma eleven", "ie"] },

  // ===================================================================
  // POKÉMON (custom)
  // ===================================================================
  { emoji: "<:pikachu:1411977802202353674>", score: 3.2, group: "custom", keys: ["pikachu","pokemon", "pokémon"] },
  { emoji: "<:ouisticram:1411977799673057290>", score: 3.2, group: "custom", keys: ["ouisticram", "chimchar","pokemon", "pokémon"] },
  { emoji: "<:grenousse:1411977797504864388>", score: 3.2, group: "custom", keys: ["grenousse", "froakie","pokemon", "pokémon"] },
  { emoji: "<:arcko:1411977795055386624>", score: 3.2, group: "custom", keys: ["arcko", "treecko","pokemon", "pokémon"] },

  // ===================================================================
  // PLATEFORMES / LIVE
  // ===================================================================
  { emoji: "🔴", score: 2, group: "platform", keys: ["live", "stream", "en direct", "direct"] },
  { emoji: "<:twitch:1411973521873047632>", score: 3, group: "platform", keys: ["twitch"] },
  { emoji: "<:YouTube:748225835269488751>", score: 2.5, group: "platform", keys: ["youtube"] },
  { emoji: "<:YouTubeBleu:1018805788090839061>", score: 2.6, group: "platform", keys: ["replay", "rediff", "rediffusion"] },
  { emoji: "<:Twitter:748225866798202932>", score: 2.5, group: "platform", keys: ["twitter"] },
  { emoji: "<:TikTok:828529933591904296>", score: 2.5, group: "platform", keys: ["tiktok", "tik tok"] },
  { emoji: "<:discord:752249596843130890>", score: 2.3, group: "platform", keys: ["discord"] },

  // ===================================================================
  // JEUX (PRIORITÉ MAX parmi les émojis génériques)
  // ===================================================================
  { emoji: "⛏️", score: 3, group: "game", keys: ["minecraft", "rush", "bedwars", "plugin"] },
  { emoji: "👻", score: 3, group: "game", keys: ["yokai", "watch", "ykw", "nathan"] },
  { emoji: "⚽", score: 3, group: "game", keys: ["inazuma", "inazuma eleven"] },
  { emoji: "🐾", score: 2.7, group: "game", keys: ["pokemon", "pokémon"] },
  { emoji: "🎮", score: 2, group: "game", keys: ["gaming", "jeu", "jeux"] },

  // ===================================================================
  // FORMATS / CONTENU
  // ===================================================================
  { emoji: "📢", score: 1.3, group: "format", keys: ["annonce", "nouveau", "premiere", "première", "sortie"] },
  { emoji: "💪", score: 1.1, group: "format", keys: ["sport", "entrainement", "workout", "fitness"] },
  { emoji: "🧪", score: 1.0, group: "format", keys: ["test", "essai", "beta"] },

  // ===================================================================  
  // GÉNÉRIQUES
  // ===================================================================
  { emoji: "⭐", score: 0.8, group: "generic", keys: ["top", "best", "meilleur"] },
  { emoji: "🛠️", score: 0.8, group: "generic", keys: ["update", "maj", "patch", "fix"] },
  { emoji: "🕒", score: 0.8, group: "generic", keys: ["horaire", "heures", "rdv"] },
  { emoji: "📅", score: 0.8, group: "generic", keys: ["planning", "semaine", "jour"] },
  { emoji: "🎬", score: 0.8, group: "generic", keys: ["video", "vidéo", "montage", "publie", "upload"] },
];
