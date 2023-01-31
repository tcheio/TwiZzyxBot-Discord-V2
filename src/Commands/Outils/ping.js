const { EmbedBuilder } = require('discord.js');
const config = require('../../../config');


class command {
    constructor() {
        this.name = "ping",
        this.description = "Permets de voir le ping du bot."
    }

    async execute(bot, interaction) {
        const PING = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('**TITRE**')
            .setDescription("DESCRIPTION")
            .setURL("https://www.twitch.tv/twizzyxpassympa")
            .setAuthor({ name: 'TwiZzyxPasSympa', iconURL: 'https://media.discordapp.net/attachments/1064189139349684244/1064189177060663326/channels4_profile.jpg?width=671&height=671', url: 'https://www.twitch.tv/twizzyxpassympa' })
            .addFields(
                { name: 'TwiZzyx est en stream sur Twitch', value: "C'est zinzin" },
                {name: "Joue à", value: "Minecraft"})
            .setThumbnail("https://media.discordapp.net/attachments/1064189139349684244/1064189177060663326/channels4_profile.jpg?width=671&height=671")
            .setImage("https://media.discordapp.net/attachments/1064189056927400048/1064189088242085968/Naruto_UHC_-Konan.png?width=720&height=405")
            .setTimestamp()
            .setFooter({ text: config.clients.name, iconURL: config.clients.logo});

        interaction.reply({ embeds: [PING] });
    }
}

module.exports = command