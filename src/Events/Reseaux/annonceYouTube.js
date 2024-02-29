const config = require('../../../config'); 
const classique = require('../../Fonctions/Classique');
const youtube = require('../../Fonctions/YouTube');

module.exports = async function annonceYouTube(bot,message) {
    if (message.channelId == config.channel.chainePrincipal){ //Channel #TwiZzyx/TwiZzyx-2
        msg = message.content;
        if (description == null){
            bot.channels.cache.get(config.channel.videos).send("# <:YouTube:748225835269488751>__**NOUVELLE VIDÉO**__<:YouTube:748225835269488751>\n\n\n"+msg+"\n\n||@everyone||");
        }
        else {
            bot.channels.cache.get(config.channel.videos).send("# <:YouTube:748225835269488751>__**NOUVELLE VIDÉO**__<:YouTube:748225835269488751>\n\n\n"+youtube.createDesc(msg,description)+"\n\n||@everyone||");
        }
        description = null;
        //log serveur
        console.log("Une vidéo a été publié à "+classique.temps());
        bot.channels.cache.get(config.channel.log).send("Une vidéo a été publié à "+classique.temps());
    }

    else if(message.channelId == config.channel.replay){ //Channel #Replay
        msg = message.content;
        bot.channels.cache.get(config.channel.lp).send("# <:YouTubeBleu:1018805788090839061>__**NOUVEAU REPLAY**__<:YouTubeBleu:1018805788090839061>\n\n\n"+msg);
        console.log("Un replay a été publié à "+classique.temps());
        bot.channels.cache.get(config.channel.log).send("Une vidéo a été publié à "+classique.temps());
    }

};
