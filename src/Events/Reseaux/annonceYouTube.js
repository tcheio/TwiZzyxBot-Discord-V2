const config = require('../../../config-test'); 
const classique = require('../../Fonctions/Classique');
const youtube = require('../../Fonctions/YouTube');

module.exports = async function annonceYouTube(bot, message) {
  const msg = message.content;
  const { texte, isShort, isLounge } = youtube.createDesc(msg);

  // On extrait le lien pour l'annonce LOUNGE minimaliste
  const parts = msg.split('|');
  const partsReplay = msg.split("]")
  

  // === Vidéo classique (long/short) ===
  if (message.channelId === config.channel.youtube) {
    const lienVideo = parts[2]?.trim() || "https://www.youtube.com";
    
    const channelCible = isShort ? config.channel.clip : config.channel.videos;
    const mention = isShort ? "<@&1014452932713922610>" : "@everyone";
    const titreAnnonce = isShort
      ? "# <:YouTube:748225835269488751>__**NOUVEAU SHORT**__<:YouTube:748225835269488751>"
      : "# <:YouTube:748225835269488751>__**NOUVELLE VIDÉO**__<:YouTube:748225835269488751>";

    const messageFinal = `${titreAnnonce}\n${texte}\n\n||${mention}||`;

    // Envoi principal
    bot.channels.cache.get(channelCible)?.send(messageFinal);

    // Logs
    const logText = isShort ? "Un short a été publié à " : "Une vidéo a été publiée à ";
    console.log(logText + classique.temps());
    bot.channels.cache.get(config.channel.log)?.send(logText + classique.temps());

    if (isLounge && config.channel.lounge && config.channel.lounge !== channelCible) {
      bot.channels.cache.get(config.channel.lounge)
        ?.send(`# BEST OF LOUNGE<:WaluiPersil:1194341885750292531>\n${lienVideo}`);
      bot.channels.cache.get(config.channel.log)
        ?.send("Annonce LOUNGE (format minimal) envoyée à " + classique.temps());
    }
  }

  // === Rediff (replay) ===
  else if (message.channelId === config.channel.twizzyxReplay) {
    const lienVideo = partsReplay[1]?.trim() || "https://www.youtube.com";
    const replayMsg =
      "# <:YouTubeBleu:1018805788090839061>__**NOUVEAU REPLAY**__<:YouTubeBleu:1018805788090839061>\n\n\n" + msg;

    // Envoi principal
    bot.channels.cache.get(config.channel.replay)?.send(replayMsg);
    bot.channels.cache.get(config.channel.log)
      ?.send("Une rediff de stream a été publiée à " + classique.temps());

    // --- Duplication LOUNGE (message minimal) ---
    if (isLounge && config.channel.lounge && config.channel.lounge !== config.channel.replay) {
      bot.channels.cache.get(config.channel.lounge)
        ?.send(`# REDIFF SOIREE LOUNGE<:WaluiPersil:1194341885750292531>\n${lienVideo}`);
      bot.channels.cache.get(config.channel.log)
        ?.send("Rediff LOUNGE (format minimal) envoyée à " + classique.temps());
    }
  }
};
