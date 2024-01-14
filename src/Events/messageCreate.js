// events/messageCreate.js
const config = require('../../config'); // Assurez-vous que le chemin est correct
const { EmbedBuilder } = require('discord.js'); // Assurez-vous que le chemin est correct

module.exports = async function handleMessageCreate(message) {
    if (message.channelId == config.channel.envoie) {

        console.log("Retour");
        // Votre code ici
}};
