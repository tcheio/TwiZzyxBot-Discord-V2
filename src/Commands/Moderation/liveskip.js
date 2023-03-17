const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../../../config');


class command {
    constructor() {
        this.name = "liveskip",
        this.description = "Empêcher l'annonce automatique d'un stream (STAFF)",
        this.category = "Moderation",
        this.permission = "ManageMessages"
    }

    async execute(bot, interaction) {

        if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
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
        else {
        const Embed = new EmbedBuilder()
        .setColor('Random')
        .setTitle('👮‍♂️ **Action de modération**')
        .setTimestamp()
        .setFooter({ text: config.clients.name, iconURL: config.clients.logo})
        .setDescription("Tu n'as pas la permission d'éxécuter cette commande");
        interaction.reply({ embeds: [Embed] });

        }
    }
}

module.exports = command