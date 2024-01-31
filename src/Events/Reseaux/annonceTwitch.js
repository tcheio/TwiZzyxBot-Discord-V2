const bot = require('../../../index'); 
const config = require('../../../config');
const { EmbedBuilder } = require('discord.js'); 
const classique = require('../../Fonctions/Classique');
const NouveauTraitementTwitch = require('../../Fonctions/NouveauTraitementTwitch');
const { minia } = require('../../Fonctions/NouveauTraitementTwitch');

module.exports = async function annonceAutoTwitch(bot,message) {
    if (message.channelId == config.channel.envoie){ //Channel #twitch channel retour
        mention = "<@&748220271839805520>";
        if (skipLive){
            if (AllLive == false){
                AllLive = true;
                mention = "@everyone";
            }
            msg = message.content;
            jeu = NouveauTraitementTwitch.chercheJeu(msg);
            titre = NouveauTraitementTwitch.testTitre(msg,jeu);
            indice = NouveauTraitementTwitch.analyseTitre(msg,jeu);
            desc = NouveauTraitementTwitch.createDesc(indice);
            
            const exampleEmbed = new EmbedBuilder()
            .setColor('#9B00FF')
            .setTitle(titre)
            .setAuthor({ name: 'TwiZzyxPasSympa', iconURL: config.clients.logo, url: 'https://twitch.tv/twizzyxpassympa' })
            .setDescription(desc)
            .setThumbnail(config.clients.logo)
            .addFields(
                {name: ':Twitch:TwiZzyx est en stream sur Twitch', value: "C'est zinzin" },
                {name: "Joue à", value: jeu})
            .setImage(NouveauTraitementTwitch.minia(indice))
            .setTimestamp()
            .setFooter({ text: 'TwiZzyxBot', iconURL: config.clients.logo });
            
            bot.channels.cache.get(config.channel.retour).send({ embeds: [exampleEmbed] });
            bot.channels.cache.get(config.channel.retour).send(mention).then(sentMessage => {
                sentMessage.delete({ timeout: 1000 });
            })
            .catch(console.error);;
    
            //log serveur
            console.log("Un live a été publié à "+classique.temps());
            bot.channels.cache.get(config.channel.logTest).send("Un live a été publié à "+classique.temps());
        }

        else if (skipLive == false){
            skipLive = true;
            //Message dans le général staff
            bot.channels.cache.get(config.channel.generalStaff).send("Un live aurait du être annoncé, <@209395375474212865> n'oublie pas de faire l'annonce et la variable skipLive est de nouveau en "+skipLive);
        }
        
        

    }
};
