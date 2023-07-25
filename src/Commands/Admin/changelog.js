const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../../../config');

const msg="- Ajout des annonces automatiques pour les vidéos sur la chaine principal\n"+
          "- Changement emojis pour certains streams (*On s'en branle en vrai*)\n"+
          "- Ajout d'une nouvelle intégration mais on en reparle dans quelques jours\n"+
          "- Modification du grade `Planning - Twitch` en <@&748220271839805520> (*On en reparlera aussi*)\n\n"+
          "- Modification dans les préfixes de certains streams (*Uniquement pour le staff*))\n"+
          "- Les repings de streams seront effectué par le bot désormais avec l'action d'un staff (*Uniquement pour le staff*))\n"+
          "- Fix des logs avec les bonnes heures (*Toujours une heure de plus ou de moins*)\n\n"+

          "Il s'agit d'une pre-version, celle que j'avais prévu est beaucoup plus grosse juste j'ai eu la flemme de bosser plus"

class command {
    constructor() {
        this.name = "changelog",
        this.description = "Afficher les mises à jour (STAFF)",
        this.permission = "Administrator"

    }

    
    async execute(bot, interaction) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrators)) {
        var now = new Date();
        skipVideo = false;
        const SKIP = new EmbedBuilder()
        .setColor('#E49B0F')
        .setTitle('⚙**__Mise à jour du '+now.getDate()+'/'+(parseInt(now.getUTCMonth())+1)+'/'+now.getFullYear()+'__** - __**PRE V2.2**__')
            .setDescription(msg)
            .setTimestamp()
            .setFooter({ text: config.clients.name, iconURL: config.clients.logo});

        interaction.reply({ embeds: [SKIP] });
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