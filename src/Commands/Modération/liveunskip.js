const { EmbedBuilder, ReactionCollector, User } = require('discord.js');
const config = require('../../../config');


class command {
    constructor() {
        this.name = "liveunskip",
        this.description = "Réactiver l'annonce automatique d'un stream (STAFF)"
    }

    async execute(bot, interaction) {
        skipLive = true;
        const SKIP = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('✅ **__Le prochain stream sera pas annoncé__**')
            .setDescription("Annonce auto réactivé.")
            .setTimestamp()
            .setFooter({ text: config.clients.name, iconURL: config.clients.logo});

        interaction.reply({ embeds: [SKIP] });
        console.log("Une vidéo a été changé de destination")
    }
}

module.exports = command