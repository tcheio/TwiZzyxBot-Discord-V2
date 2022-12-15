const { EmbedBuilder, ReactionCollector, User } = require('discord.js');
const config = require('../../../config');

const msg="- __**Passage à la version 2 du bot**__\n(On est encore loin du compte je vous jure qu'il n'y a rien qui va)\n- Optimisation globale de toutes les fonctionnalités déjà présente précédemment\n- Ajout des commandes en / pour le staff et cela viens avec une règle provisoire:\n\n**PERSONNE NE TOUCHE AUX COMMANDES SANS Y AVOIR ETE AUTORISE AU PREALABLE**\n\nSi je vois l'un d'entre vous en utiliser sans y avoir été invité, c'est mute provisoire puis dégage après\n\n**D'autres nouveautés arriveront par la suite et des améliorations de la sécurité au niveau des commandes.**";

class command {
    constructor() {
        this.name = "changelog",
        this.description = "Afficher les mises à jour (STAFF)"
    }

    
    async execute(bot, interaction) {
        skipVideo = false;
        const SKIP = new EmbedBuilder()
        .setColor('#E49B0F')
        .setTitle('⚙**__Mise à jour du 15/12/2022__**')
            .setDescription(msg)
            .setTimestamp()
            .setFooter({ text: config.clients.name, iconURL: config.clients.logo});

        interaction.reply({ embeds: [SKIP] });
    }
}

module.exports = command