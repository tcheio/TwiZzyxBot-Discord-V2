const { EmbedBuilder,PermissionsBitField } = require('discord.js');
const config = require('../../../config');


class command {
    constructor() {
        this.name = "help",
        this.description = "Résumé de toutes les commandes que vous pouvez utiliser"
    }

    async execute(bot, interaction) {
        const help = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('**Liste des commandes utilisable sur le serveur**')
            .setDescription("__Membres:__\n`ping` ➔ Connaître le ping du bot\n`help` ➔ Liste de toutes les commandes\n`info` ➔ Obtenir des infos sur différents sujets (SOON)")
            .setTimestamp()
            .setFooter({ text: config.clients.name, iconURL: config.clients.logo})
            if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
                help.addFields({
                    name: "__Modération:__", value: " `live` ➔ Changer le mode d'annonce d'une vidéo (*normal, all ou cancel*)\n`clear` ➔ Suprimer plusieurs message d'un coup\n`animation` ➔ Permet d'annoncer une animation (*Mettre `help` en argument pour obtenir la liste des animations dispo*)"
                })
            }

            if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)){
                help.addFields({
                    name: "__Administration:__", value: "`changelog` ➔ Upload un message dans le changelog concernant les nouveautés du bot\n`stop` ➔ Arrête le Bot"
                })
            }
        interaction.reply({ embeds: [help] });

    }
}

module.exports = command