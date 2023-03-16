const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../../../config');


class command {
    constructor() {
        this.name = "planningreset",
        this.description = "Reset le planning de la semaine"
        this.permission = "ManageMessages"
    }

    async execute(bot, interaction) {

        if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
        planning = "https://media.discordapp.net/attachments/1064189056927400048/1079745624628527215/planningPasDispo.png?width=1193&height=671";
        changement = "Pour le moment aucun"
        const SKIP = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('✅ **__Le planning a été réinitialisé__**')
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