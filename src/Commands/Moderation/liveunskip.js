const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../../../config');
const Permissions = require('../../Permissions');


class command {
    constructor() {
        this.name = "liveunskip",
        this.description = "Réactiver l'annonce automatique d'un stream (STAFF)",
        this.permission = "ManageMessages"
    }


    // exécuter la commande ici
    async execute(bot, interaction) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
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