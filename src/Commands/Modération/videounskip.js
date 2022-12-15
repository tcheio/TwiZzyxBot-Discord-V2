const { EmbedBuilder, ReactionCollector, User } = require('discord.js');
const config = require('../../../config');


class command {
    constructor() {
        this.name = "videounskip",
        this.description = "Changer le channel d'annonce vidéo (STAFF)"
    }

    async execute(bot, interaction) {
        skipVideo = true;
        const SKIP = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('✅ **__Vidéo changé de destination__**')
            .setDescription("La prochaine vidéo est changé de destination (<#748247106980020236> → <#1023891712403312720>)")
            .setTimestamp()
            .setFooter({ text: config.clients.name, iconURL: config.clients.logo});

        interaction.reply({ embeds: [SKIP] });
        console.log("Une vidéo a été changé de destination")
    }
}

module.exports = command