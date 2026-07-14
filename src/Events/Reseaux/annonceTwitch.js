const config = require('../../../config');
const { EmbedBuilder } = require('discord.js');
const classique = require('../../Fonctions/Classique');
const Twitch = require('../../Fonctions/Twitch');
const state = require('../../Structure/StreamState');

module.exports = async function annonceAutoTwitch(bot, message) {
    if (message.channelId !== config.channel.twitch) return;

    let mention = "<@&748220271839805520>";

    if (state.skipLive) {
        if (state.AllLive === false) {
            state.AllLive = true;
            mention = "@everyone";
        }
        const msg = message.content;
        const jeu = Twitch.chercheJeu(msg);
        const titre = Twitch.testTitre(msg);
        const indice = Twitch.analyseTitre(msg, jeu);
        const desc = Twitch.createDesc(indice);

        const exampleEmbed = new EmbedBuilder()
            .setColor('#9B00FF')
            .setTitle(titre)
            .setAuthor({ name: 'TwiZzyxPasSympa', iconURL: config.clients.logoTwitch, url: 'https://twitch.tv/twizzyxpassympa' })
            .setDescription(desc)
            .setThumbnail(config.clients.logoTwitch)
            .setURL('https://twitch.tv/twizzyxpassympa')
            .addFields(
                { name: '<:twitch:1411973521873047632>**TwiZzyx** est en stream sur Twitch', value: "C'est zinzin" },
                { name: "Joue à", value: jeu })
            .setImage(Twitch.minia(indice))
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
            "## Annonce de stream" +
            "🕒" + classique.temps() + "\n" +
            "📢" + titre + "\n" +
            "🎮 " + jeu + "\n" +
            "------------------------------------------------------";
        bot.channels.cache.get(config.channel.log)?.send(logMessage);
    } else {
        state.skipLive = true;
        bot.channels.cache.get(config.channel.generalStaff)
            ?.send("Un live aurait du être annoncé, <@209395375474212865> n'oublie pas de faire l'annonce et la variable skipLive est de nouveau en " + state.skipLive);
    }
};
