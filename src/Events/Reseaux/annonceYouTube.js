const config = require('../../../config'); 
const classique = require('../../Fonctions/Classique');
const youtube = require('../../Fonctions/YouTube');

module.exports = async function annonceYouTube(bot,message) {
    if (message.channelId == config.channel.youtube){ //Channel #Twizzyx²
        if (skipVideo) {
            msg = message.content;
            console.log("Message: "+msg);

            if (description == null){
                bot.channels.cache.get(config.channel.videos).send("# <:YouTube:748225835269488751>__**NOUVELLE VIDÉO**__<:YouTube:748225835269488751>\n\n\n"+msg+"\n\n||@everyone||");
            }
            else {
                bot.channels.cache.get(config.channel.videos).send("# <:YouTube:748225835269488751>__**NOUVELLE VIDÉO**__<:YouTube:748225835269488751>\n\n\n"+youtube.createDesc(msg,description)+"\n\n||@everyone||");
            }
            //log serveur
            console.log("Une vidéo sur TwiZzyx² a été publié à "+classique.temps());
            bot.channels.cache.get(config.channel.log).send("Une vidéo sur TwiZzyx² a été publié à "+classique.temps()); 
        }  
        else if(skipVideo == true){
            bot.channels.cache.get(config.channel.lp).send("# <:YouTubeBleu:1018805788090839061>__**NOUVEL EPISODE LP**__<:YouTubeBleu:1018805788090839061>\n\n\n"+msg+"\n\n||<@&1018803719250382898>||");
            console.log("Un replay a été publié à "+classique.temps());
            bot.channels.cache.get(config.channel.log).send("Un épisode de LP a été publié à "+classique.temps());
        }

        else {
            bot.channels.cache.get(config.channel.logTest).send("J'ai rencontré une erreur à "+classique.temps()+" concernant l'annonce"+msg+".\nJe suis toujours en ligne cepenedant.");
        }
    }    

    else if (message.channelId == config.channel.chainePrincipal){ //Channel #TwiZzyx
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
        bot.channels.cache.get(config.channel.lp).send("# <:YouTubeBleu:1018805788090839061>__**NOUVEAU REPLAY**__<:YouTubeBleu:1018805788090839061>\n\n\n"+msg+"\n\n||<@&1018803719250382898>||");
        console.log("Un replay a été publié à "+classique.temps());
        bot.channels.cache.get(config.channel.log).send("Une vidéo a été publié à "+classique.temps());
    }

};
