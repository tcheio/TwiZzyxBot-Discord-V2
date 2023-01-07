const { EmbedBuilder, ReactionCollector, User } = require('discord.js');
const config = require('../../../config');

const msg="- Fix du problème *'undefined'* des annonces de stream (**ENFIN**) \n"+
            "- Refonte des annonces de stream (*Plus de pseudo et de commande dans le titre du stream*) de manière à ressembler aux annonces que je faisais à la main\n"+
            "- Ajout d'un système de logs pour les différentes annonces (*Surtout utile pour moi pour l'instant*)\n"+
            "- Changement du channel <#1060679452146802769> qui devient un channel forum donc pour toute suggestions, il vous suffira de créer un post avec l'un des tags suivants:\n"+
            "   >**YouTube**\n  >**Twitch**\n   >**Discord**\n  >**Autres**\n\n"+
            "**La prochaine grosse update concernera les commandes avec l'arrivée des commandes de modération et de commandes pour vous également** (Après c'est pas pour tout de suite XD)";

class command {
    constructor() {
        this.name = "changelog",
        this.description = "Afficher les mises à jour (STAFF)"
    }

    
    async execute(bot, interaction) {
        var now = new Date();
        skipVideo = false;
        const SKIP = new EmbedBuilder()
        .setColor('#E49B0F')
        .setTitle('⚙**__Mise à jour du '+now.getDate()+'/'+(parseInt(now.getUTCMonth())+1)+'/'+now.getFullYear()+'__**')
            .setDescription(msg)
            .setTimestamp()
            .setFooter({ text: config.clients.name, iconURL: config.clients.logo});

        interaction.reply({ embeds: [SKIP] });
    }
}

module.exports = command