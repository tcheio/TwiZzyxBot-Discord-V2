const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../../../config');


class command {
    constructor() {
        this.name = "videoskip",
        this.description = "Changer le channel d'annonce vidéo (STAFF)",
        this.permission = "Administrator"
    }

    async execute(bot, interaction) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
        skipVideo = false;
        const SKIP = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('✅ **__Vidéo changé de destination__**')
            .setDescription("La prochaine vidéo est changé de destination (<#1023891712403312720> → <#748247106980020236>)")
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