const bot = require('../../../index'); 
const config = require('../../../config');
const { EmbedBuilder } = require('discord.js'); 
const classique = require('../../Fonctions/Classique');
const NouveauTraitementTwitch = require('../../Fonctions/NouveauTraitementTwitch');

module.exports = async function repingTwitch(bot,message) {
    if (message.channelId == config.channel.reping){ //Channel #twitch channel retour
        mention = "<@&748220271839805520>";
        if (skipLive){
            if (AllLive == false){
                AllLive = true;
                mention = "@everyone";
            }
            msg = message.content;
            jeu = NouveauTraitementTwitch.chercheJeu(msg);
            titre = NouveauTraitementTwitch.testTitre(msg);
            indice = NouveauTraitementTwitch.analyseTitre(msg,jeu);
            desc = NouveauTraitementTwitch.createDesc(indice);
            
            const exampleEmbed = new EmbedBuilder()
            .setColor('#9B00FF')
            .setTitle(titre)
            .setAuthor({ name: 'TwiZzyxPasSympa', iconURL: config.clients.logo, url: 'https://twitch.tv/twizzyxpassympa' })
            .setURL('https://twitch.tv/twizzyxpassympa')
            .setDescription(desc)
            .setThumbnail(config.clients.logo)
            .setURL('https://twitch.tv/twizzyxpassympa')
            .addFields(
                {name: '<:Twitch:748225816973803562>**TwiZzyx** est toujours en stream sur Twitch', value: "Il ne s'arrête jamais" },
                {name: "Joue à", value: jeu})
            .setImage(NouveauTraitementTwitch.minia(indice))
            .setTimestamp()
            .setFooter({ text: 'TwiZzyxBot', iconURL: config.clients.logo });
            
            bot.channels.cache.get(config.channel.stream).send({ embeds: [exampleEmbed] });
            bot.channels.cache.get(config.channel.stream).send(mention).then(sentMessage => {
                sentMessage.delete({ timeout: 1000 });
            })
            .catch(console.error);;
    
            //log serveur
            console.log("Un live a été publié à "+classique.temps());
            bot.channels.cache.get(config.channel.log).send("Un live "+jeu+" a été publié à "+classique.temps());
        }
};}
