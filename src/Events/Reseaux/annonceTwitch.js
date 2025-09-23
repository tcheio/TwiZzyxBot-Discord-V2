const bot = require('../../../index'); 
const config = require('../../../config');
const { EmbedBuilder } = require('discord.js'); 
const classique = require('../../Fonctions/Classique');
const Twitch = require('../../Fonctions/Twitch');
var indice = null;

module.exports = async function annonceAutoTwitch(bot,message) {
    if (message.channelId == config.channel.envoie){
        mention = "<@&748220271839805520>";
        if (skipLive){
            if (AllLive == false){
                AllLive = true;
                mention = "@everyone";
            }
            msg = message.content;
            jeu = Twitch.chercheJeu(msg);
            titre = Twitch.testTitre(msg);
            indice = Twitch.analyseTitre(msg,jeu);
            desc = Twitch.createDesc(indice);
            
            const exampleEmbed = new EmbedBuilder()
            .setColor('#9B00FF')
            .setTitle(titre)
            .setAuthor({ name: 'TwiZzyxPasSympa', iconURL: config.clients.logoTwitch, url: 'https://twitch.tv/twizzyxpassympa' })
            .setDescription(desc)
            .setThumbnail(config.clients.logoTwitch)
            .setURL('https://twitch.tv/twizzyxpassympa')
            .addFields(
                {name: '<:twitch:1411973521873047632>**TwiZzyx** est en stream sur Twitch', value: "C'est zinzin"},
                {name: "Joue à", value: jeu})
            .setImage(Twitch.minia(indice))
            .setTimestamp()
            .setFooter({ text: 'TwiZzyxBot', iconURL: config.clients.logo });
            
            bot.channels.cache.get(config.channel.retour).send({ embeds: [exampleEmbed] });
            bot.channels.cache.get(config.channel.retour).send(mention).then(sentMessage => {
                sentMessage.delete({ timeout: 1000 });
            })
            .catch(console.error);;
            
            //log serveur
            const logMessage = 
                "------------------------------------------------------\n"+
                "## Annonce de stream"+
                "🕒"+classique.temps()+"\n"+
                "📢"+ titre+"\n"+
                "🎮 "+jeu+"\n"+
                "------------------------------------------------------";
            bot.channels.cache.get(config.channel.logTest).send(logMessage);
        }

        else if (skipLive == false){
            skipLive = true;
            bot.channels.cache.get(config.channel.generalStaff).send("Un live aurait du être annoncé, <@209395375474212865> n'oublie pas de faire l'annonce et la variable skipLive est de nouveau en "+skipLive);
        }
    }
};
