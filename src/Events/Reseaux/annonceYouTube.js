const config = require('../../../config'); 
const classique = require('../../Fonctions/Classique');
const youtube = require('../../Fonctions/YouTube');

module.exports = async function annonceYouTube(bot, message) {
    const msg = message.content;
    const { texte, isShort } = youtube.createDesc(msg);

    if (message.channelId === config.channel.chainePrincipal) {
        const channelCible = isShort ? config.channel.clip : config.channel.videos;
        const mention = isShort ? "<@&1014452932713922610>" : "@everyone";
        const titreAnnonce = isShort
            ? "# <:YouTube:748225835269488751>__**NOUVEAU SHORT**__<:YouTube:748225835269488751>"
            : "# <:YouTube:748225835269488751>__**NOUVELLE VIDÉO**__<:YouTube:748225835269488751>";

        const messageFinal = `${titreAnnonce}\n${texte}\n\n||${mention}||`;

        bot.channels.cache.get(channelCible).send(messageFinal);

        const logText = isShort ? "Un short a été publié à " : "Une vidéo a été publiée à ";
        console.log(logText + classique.temps());
        bot.channels.cache.get(config.channel.log).send(logText + classique.temps());
    }
    else if (message.channelId === config.channel.twizzyxReplay) {
        bot.channels.cache.get(config.channel.replay).send(
            "# <:YouTubeBleu:1018805788090839061>__**NOUVEAU REPLAY**__<:YouTubeBleu:1018805788090839061>\n\n\n" + msg
        );
        bot.channels.cache.get(config.channel.log).send("Une rediff de stream a été publiée à " + classique.temps());
    }
};
