const config = require('../../../config'); 
const classique = require('../../Fonctions/Classique');
const youtube = require('../../Fonctions/YouTube');

module.exports = async function annonceYouTube(bot,message) {
    msg = message.content;
    if (message.channelId == config.channel.chainePrincipal){ //Channel #TwiZzyx/TwiZzyxPasSympa
        if (youtube.rechercheCaract(msg)){
            bot.channels.cache.get(config.channel.channelTampons).send("# <:YouTube:748225835269488751>__**NOUVEAU SHORT**__<:YouTube:748225835269488751>\n\n\n"+youtube.createDesc(msg,description)+"\n\n||<@&1014452932713922610>||");
        }
        else {
            bot.channels.cache.get(config.channel.channelTampons).send("# <:YouTube:748225835269488751>__**NOUVELLE VIDÉO**__<:YouTube:748225835269488751>\n\n\n"+youtube.createDesc(msg,description)+"\n\n||@everyone||");
            description = null;
            console.log("Une vidéo a été publié à "+classique.temps());
            bot.channels.cache.get(config.channel.channelTampons).send("Une vidéo a été publié à "+classique.temps());
        }
    }

    else if(message.channelId == config.channel.twizzyxReplay){
        bot.channels.cache.get(config.channel.channelTampons).send("# <:YouTubeBleu:1018805788090839061>__**NOUVEAU REPLAY**__<:YouTubeBleu:1018805788090839061>\n\n\n"+msg);
        console.log("Un replay a été publié à "+classique.temps());
        bot.channels.cache.get(config.channel.channelTampons).send("Une vidéo a été publié à "+classique.temps());
    }

};
