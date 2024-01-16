const bot = require('../../index'); 
const config = require('../../config');
const { EmbedBuilder } = require('discord.js'); 
const { channel } = require('diagnostics_channel');
const classique = require('../Fonctions/Classique');
const twitch = require('../Fonctions/Twitch');

module.exports = async function annonceAutoTwitch(bot,message) {
    if (message.channelId == config.channel.envoie){ //Channel #twitch channel retour
        mention = "<@&748220271839805520>";
        if (skipLive){
            if (AllLive == false){
                AllLive = true;
                mention = "@everyone";
            }
            msg = message.content;
            jeu = twitch.chercheJeu(msg);

            //Recherche Classique
            titre = twitch.titreTravail(msg);
            console.log(titre);
            desc = twitch.descriptionTravail(msg);
            console.log(desc);
            minia = twitch.chercheMinia(titre,jeu);

            //Recherche Event spécial
            /*titre = twitch.titreTravail2(msg);
            console.log(titre);
            desc = twitch.descriptionTravail2(msg);
            console.log(desc);
            categorie = twitch.chercheVraiTitre(titre);
            console.log(categorie);
            minia = twitch.chercheMinia(categorie,jeu);*/
            const exampleEmbed = new EmbedBuilder()
            .setColor('#9B00FF')
            .setTitle(twitch.emoteTitre(titre))
            .setAuthor({ name: 'TwiZzyxPasSympa', iconURL: config.clients.logo, url: 'https://twitch.tv/twizzyxpassympa' })
            .setDescription(desc)
            .setThumbnail(config.clients.logo)
            .addFields(
                {name: ':Twitch:TwiZzyx est en stream sur Twitch', value: "C'est zinzin" },
                {name: "Joue à", value: jeu})
            .setImage("https://media.discordapp.net/attachments/1155056404583956531/1155056424653705216/Twix_FB1_1.png?ex=65b4bd1f&is=65a2481f&hm=0b2b83c1bf2f67b3a690d5cef5b571328ef3add35728e99ee643681f9c3a9f0d&=&format=webp&quality=lossless&width=1193&height=671")
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
            bot.channels.cache.get(config.channel.retour).send("Un live aurait du être annoncé, <@209395375474212865> n'oublie pas de faire l'annonce et la variable skipLive est de nouveau en "+skipLive);
        }
        
        

    }
};
