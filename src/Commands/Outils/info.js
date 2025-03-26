const { EmbedBuilder } = require('discord.js');
const config = require('../../../config');


class command {
    constructor() {
        this.name = "info",
        this.description = "Quelques informations utile pour vous."
    }

    async execute(bot, interaction) {
        const info = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('**Commande en cours de développement**')
            .setDescription("Cette commande est cours de création et sera disponible prochainement.")
            .setTimestamp()
            .setFooter({ text: config.clients.name, iconURL: config.clients.logo});
            
            interaction.reply({ embeds: [info] });
    }
}

module.exports = command