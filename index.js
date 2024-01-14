const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');
const { cp, stat } = require('fs');
const config = require('./config');
const { channel } = require('diagnostics_channel');
const { log } = require('console');
const annonceAutoTwitch = require('./src/Events/annonceTwitch');
const handleMessageCreate2 = require('./src/Events/messageCreate2');
const classique = require('./src/Fonctions/Classique');
const twitch = require('./src/Fonctions/Twitch');

const bot = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ]
});

bot.commands = new Collection();


bot.on('messageCreate', annonceAutoTwitch);
bot.on('messageCreate', handleMessageCreate2);

//Constantes
skipVideo = true;
NoneVideo = true;
shorts = true;
skipLive = true;
AllLive = true;
description = null;


    

bot.on("messageCreate", async message => {
    if (message.channelId == config.channel.reping){ //Channel #reping-stream
        mention = "<@&748220271839805520>";
        msg = message.content;
        jeu = chercheJeu(msg);

        //Recherche Classique
        titre = titreTravail(msg);
        console.log(titre);
        desc = descriptionTravail(msg);
        console.log(desc);
        minia = chercheMinia(titre,jeu);

        //Recherche Event spécial
        titre = titreTravail2(msg);
        console.log(titre);
        desc = descriptionTravail2(msg);
        categorie = chercheVraiTitre(titre);
        minia = chercheMinia(categorie,jeu);
                const TWITCH = new EmbedBuilder()
                    .setColor('#9B00FF')
                    .setTitle("**"+emoteTitre(titre)+"**")
                    .setDescription(desc)
                    .setURL("https://www.twitch.tv/twizzyxpassympa")
                    .setAuthor({ name: 'TwiZzyxPasSympa', iconURL: 'https://media.discordapp.net/attachments/1064189139349684244/1064189177060663326/channels4_profile.jpg?width=671&height=671', url: 'https://www.twitch.tv/twizzyxpassympa' })
                    .addFields(
                        {name: '<:Twitch:748225816973803562>TwiZzyx est toujours en stream sur Twitch', value: "Il ne s'arrête jamais ou quoi là" },
                        {name: "Joue à", value: jeu})
                    .setThumbnail("https://media.discordapp.net/attachments/1064189139349684244/1064189177060663326/channels4_profile.jpg?width=671&height=671")
                    .setImage(minia)
                    .setTimestamp()
                    .setFooter({ text: config.clients.name, iconURL: config.clients.logo});
                    bot.channels.cache.get(config.channel.stream).send({ embeds: [TWITCH] });
                    bot.channels.cache.get(config.channel.stream).send(mention).then(sentMessage => {
                        sentMessage.delete({ timeout: 4000 });
                    })
                    .catch(console.error);;

            //log serveur
            console.log("Un reping de live a été publié à "+temps());
            bot.channels.cache.get(config.channel.log).send("Un reping de live a été publié à "+temps());
    }
    else if (message.channelId == config.channel.youtube){ //Channel #clip-lp
        if (skipVideo && NoneVideo) {
            msg = message.content;
            console.log("Message: "+msg);
            bot.channels.cache.get(config.channel.lp).send("<:YouTubeBleu:1018805788090839061> __**NOUVELLE VIDEO TWIZZYX²**__ <:YouTubeBleu:1018805788090839061>\n\n"+msg+"\n\n||<@&1018803719250382898>||"); //envoie ce message dans le channel "lp"
            //log serveur
            console.log("Une vidéo sur TwiZzyx² a été publié à "+temps());
            bot.channels.cache.get(config.channel.log).send("Une vidéo sur TwiZzyx² a été publié à "+temps()); 
        }
                
        else if(skipVideo == true && NoneVideo == false){
            bot.channels.cache.get(config.channel.generalStaff).send("Une vidéo aurait du être annoncé <@209395375474212865> et la variable NoneVideo est de nouveau en "+NoneVideo); 
        }

        else {
            msg = message.content;
            if (description == null){
                bot.channels.cache.get(config.channel.videos).send("# <:YouTube:748225835269488751>__**NOUVELLE VIDÉO**__<:YouTube:748225835269488751>\n\n\n"+msg+"\n\n||@everyone||");
            }
            else {
                bot.channels.cache.get(config.channel.videos).send("# <:YouTube:748225835269488751>__**NOUVELLE VIDÉO**__<:YouTube:748225835269488751>\n\n\n"+createDesc(msg,description)+"\n\n||@everyone||");
            }
            skipVideo = true;
            description = null;
            //log serveur
            console.log("Une vrai vidéo sur la chaine secondaire a été publié à "+temps()+" et la variable skipVideo = "+skipVideo);
            bot.channels.cache.get(config.channel.log).send("Une vrai vidéo sur la chaine secondaire a été publié à "+temps()+" et la variable skipVideo = "+skipVideo); 
        }
    }    

    else if (message.channelId == config.channel.chainePrincipal){ //Channel #videos
        msgVideo = message.content;
        statut = rechercheCaract(msgVideo);

        console.log(description)
        if (!statut){

            
            msg = message.content;
            if (description == null){
                bot.channels.cache.get(config.channel.videos).send("# <:YouTube:748225835269488751>__**NOUVELLE VIDÉO**__<:YouTube:748225835269488751>\n\n\n"+msg+"\n\n||@everyone||");
            }
            else {
                bot.channels.cache.get(config.channel.videos).send("# <:YouTube:748225835269488751>__**NOUVELLE VIDÉO**__<:YouTube:748225835269488751>\n\n\n"+createDesc(msg,description)+"\n\n||@everyone||");
            }
            description = null;
            //log serveur
            console.log("Une vidéo a été publié à "+temps());
            bot.channels.cache.get(config.channel.log).send("Une vidéo a été publié à "+temps()); 
        }

        else {
            bot.channels.cache.get(config.channel.clip).send("<:YouTube:748225835269488751>__**NOUVELLE CLIP**__<:YouTube:748225835269488751>\n\n**"+msgVideo+"**\n\n||@everyone||");
            console.log("Un clip a été publié à "+temps());
            bot.channels.cache.get(config.channel.log).send("Une vidéo a été publié à "+temps()); 
        }
        
        
    }
});

require('./src/Structure//Handler/Event')(bot);
require('./src/Structure//Handler/Command')(bot);


bot.login(config.clients.tokenTest);
