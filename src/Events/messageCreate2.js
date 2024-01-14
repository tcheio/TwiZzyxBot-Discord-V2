// events/messageCreate.js
const config = require('../../config'); // Assurez-vous que le chemin est correct
const { EmbedBuilder } = require('discord.js'); // Assurez-vous que le chemin est correct

module.exports = async function handleMessageCreate2(message) {
    if (message.channelId == config.channel.retour) {

        console.log("Retour2");
        bot.channels.cache.get(config.channel.envoie).send("Retour2");
        // Votre code ici
}};
