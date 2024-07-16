const config = require('../../../config'); 
const classique = require('../../Fonctions/Classique');
const youtube = require('../../Fonctions/YouTube');

module.exports = async function annonceYouTube(bot,message) {
    if (message.channelId == config.channel.envoie){ //Channel #TwiZzyx/TwiZzyx-2
        msg = message.content;
        if (youtube.rechercheCaract(msg)){
            bot.channels.cache.get(config.channel.retour).send("# <:YouTube:748225835269488751>__**NOUVEAU SHORT**__<:YouTube:748225835269488751>\n\n\n"+msg+"\n\n||<@&1014452932713922610>||");
        }
        else {
            bot.channels.cache.get(config.channel.retour).send("# <:YouTube:748225835269488751>__**NOUVELLE VIDÉO**__<:YouTube:748225835269488751>\n\n\n"+youtube.createDesc(msg,description)+"\n\n||@everyone||");
            description = null;
            //log serveur
            console.log("Une vidéo a été publié à "+classique.temps());
            bot.channels.cache.get(config.channel.logTest).send("Une vidéo a été publié à "+classique.temps());
        }
    }

    else if(message.channelId == config.channel.twizzyxReplay){ //Channel #Replay
        msg = message.content;
        bot.channels.cache.get(config.channel.replay).send("# <:YouTubeBleu:1018805788090839061>__**NOUVEAU REPLAY**__<:YouTubeBleu:1018805788090839061>\n\n\n"+msg);
        console.log("Un replay a été publié à "+classique.temps());
        bot.channels.cache.get(config.channel.log).send("Une vidéo a été publié à "+classique.temps());
    }

};
