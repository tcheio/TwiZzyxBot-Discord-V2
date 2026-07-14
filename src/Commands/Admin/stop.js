const { EmbedBuilder } = require('discord.js');
const config = require('../../../config');
const { temps } = require('../../Fonctions/Classique');

class command {
    constructor() {
        this.name = "stop",
        this.description = "Arrête le bot",
        this.permission = "Administrator"

    }

    async execute(bot, interaction) {
        if (interaction.user.id == config.Info.OwnerID){
            const STOP = new EmbedBuilder()
            .setColor('#E49B0F')
            .setTitle('🚨__**Extinction du bot**__')
                .setDescription("Le Bot est sur le point de s'arrêter.")
                .setTimestamp()
                .setFooter({ text: config.clients.name, iconURL: config.clients.logo});

            await interaction.reply({ embeds: [STOP] });
            await bot.channels.cache.get(config.channel.logTest)?.send("Le bot a été éteint par "+interaction.user+" à "+temps());
            bot.destroy();
            process.exit(0);
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