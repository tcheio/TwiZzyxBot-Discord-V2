const config = require('../../../config');
const { EmbedBuilder } = require('discord.js');
const classique = require('../../Fonctions/Classique');
const NouveauTraitementTwitch = require('../../Fonctions/Twitch');
const state = require('../../Structure/StreamState');

module.exports = async function repingTwitch(bot, message) {
    if (message.channelId !== config.channel.reping) return; //Channel #twitch channel retour

    let mention = "<@&748220271839805520>";

    if (state.skipLive) {
        if (state.AllLive === false) {
            state.AllLive = true;
            mention = "@everyone";
        }
        const msg = message.content;
        const jeu = NouveauTraitementTwitch.chercheJeu(msg);
        const titre = NouveauTraitementTwitch.testTitre(msg);
        const indice = NouveauTraitementTwitch.analyseTitre(msg, jeu);
        const desc = NouveauTraitementTwitch.createDesc(indice);

        const exampleEmbed = new EmbedBuilder()
            .setColor('#9B00FF')
            .setTitle(titre)
            .setAuthor({ name: 'TwiZzyxPasSympa', iconURL: config.clients.logoTwitch, url: 'https://twitch.tv/twizzyxpassympa' })
            .setURL('https://twitch.tv/twizzyxpassympa')
            .setDescription(desc)
            .setThumbnail(config.clients.logoTwitch)
            .addFields(
                { name: '<:twitch:1411973521873047632>**TwiZzyx** est toujours en stream sur Twitch', value: "Il ne s'arrête jamais" },
                { name: "Joue à", value: jeu })
            .setImage(NouveauTraitementTwitch.minia(indice))
            .setTimestamp()
            .setFooter({ text: 'TwiZzyxBot', iconURL: config.clients.logo });

        const streamChannel = bot.channels.cache.get(config.channel.stream);
        if (streamChannel) {
            await streamChannel.send({ embeds: [exampleEmbed] });
            streamChannel.send(mention)
                .then(sentMessage => setTimeout(() => sentMessage.delete().catch(() => {}), 1000))
                .catch(console.error);
        }

        //log serveur
        const logMessage =
            "------------------------------------------------------\n" +
            "## Reping de stream" +
            "🕒" + classique.temps() + "\n" +
            "📢" + titre + "\n" +
            "🎮 " + jeu + "\n" +
            "------------------------------------------------------";
        bot.channels.cache.get(config.channel.log)?.send(logMessage);
    }
};
