const { EmbedBuilder, ReactionCollector, User } = require('discord.js');
const config = require('../../../config');


class command {
    constructor() {
        this.name = "liveskip",
        this.description = "Empêcher l'annonce automatique d'un stream (STAFF)"
    }

    async execute(bot, interaction) {
        skipLive = false;
        const SKIP = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('✅ **__Le prochain stream ne sera pas annoncé__**')
            .setDescription("Le prochain stream n'aura pas d'annonce auto.")
            .setTimestamp()
            .setFooter({ text: config.clients.name, iconURL: config.clients.logo});

        interaction.reply({ embeds: [SKIP] });
        console.log("Une vidéo a été changé de destination")
    }
}

module.exports = command