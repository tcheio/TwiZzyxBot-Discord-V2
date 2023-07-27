const { EmbedBuilder,PermissionsBitField } = require('discord.js');
const config = require('../../../config');


class command {
    constructor() {
        this.name = "info",
        this.description = "Quelques informations utile pour vous."
    }

    async execute(bot, interaction) {
        const help = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('**Information utile pour vous.**')
            .setDescription("Choisissez la catégorie de l'information que vous souhaitez avoir.")
            .setTimestamp()
            .setFooter({ text: config.clients.name, iconURL: config.clients.logo});
    }
}

module.exports = command