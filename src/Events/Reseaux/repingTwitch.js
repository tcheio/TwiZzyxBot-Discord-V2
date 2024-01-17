const bot = require('../../../index'); 
const config = require('../../../config');
const { EmbedBuilder } = require('discord.js'); 
const { channel } = require('diagnostics_channel');
const classique = require('../../Fonctions/Classique');
const twitch = require('../../Fonctions/Twitch');

module.exports = async function repingTwitch(bot,message) {
    if (message.channelId == config.channel.reping){ //Channel #reping-stream
        mention = "<@&748220271839805520>";
        msg = message.content;
        jeu = twitch.chercheJeu(msg);

        //Recherche Classique
        titre = twitch.titreTravail(msg);
        console.log(titre);
        desc = twitch.descriptionTravail(msg);
        console.log(desc);
        minia = twitch.chercheMinia(titre,jeu);

        //Recherche Event spécial
        /*titre = titreTravail2(msg);
        console.log(titre);
        desc = descriptionTravail2(msg);
        categorie = chercheVraiTitre(titre);
        minia = chercheMinia(categorie,jeu);*/
        const exampleEmbed = new EmbedBuilder()
        .setColor('#9B00FF')
        .setTitle(twitch.emoteTitre(titre,jeu))
        .setAuthor({ name: 'TwiZzyxPasSympa', iconURL: config.clients.logo, url: 'https://twitch.tv/twizzyxpassympa' })
        .setDescription(desc)
        .setThumbnail(config.clients.logo)
        .addFields(
            {name: ':Twitch:TwiZzyx est en stream sur Twitch', value: "C'est zinzin" },
            {name: "Joue à", value: jeu})
        .setImage(twitch.chercheMinia(titre,jeu))
        .setTimestamp()
        .setFooter({ text: 'TwiZzyxBot', iconURL: config.clients.logo });
        
        bot.channels.cache.get(config.channel.twitch).send({ embeds: [exampleEmbed] });
        bot.channels.cache.get(config.channel.twitch).send(mention).then(sentMessage => {
            sentMessage.delete({ timeout: 1000 });
        })
        .catch(console.error);;

            //log serveur
            console.log("Un reping de live a été publié à "+classique.temps());
            bot.channels.cache.get(config.channel.log).send("Un reping de live a été publié à "+classique.temps());
        
        

    }
};
