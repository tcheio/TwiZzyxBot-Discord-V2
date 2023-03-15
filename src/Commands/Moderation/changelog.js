const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../../../config');

const msg="- <:Twitch:748225816973803562>**NOUVELLES ANNONCES DE STREAM** qui s'adapte automatiquement à ce qu'on fait (*Ça dépend du scenario et bon vous les avez déjà vu depuis un moment*) \n"+ 
          "- **Ajout des permissions pour les commandes**, vous ne pouvez utiliser qu'une partie des commandes et le staffs peuvent toutes les utilisés\n"+
          "- **Ajout de la première commande pour vous:** `/planning` qui comme son nom l'indique vous affiche le planning de la semaine en cours. J'en profiterai également pour mettre à jour le planning photo dés que je suis au courant donc en cas de changement de programme vous pourrez le voir de manière visible sur une image planning"+
          "- **Ajout de la commande** `/clear` **pour __le staff__** qui permet de clear un certains nombre de messages et même choisir les utilisateurs\n"+
          "- **Ajout de la commande** `/planningreset` **pour __le staff__** qui permet de reset le planning en fin de semaine (*Commande provisoire le temps d'automatiser le proces*)\n\n"+
          
          "Outre ça, il y a également eu **une optimisation de certaines parcels de code**, **une optimisation également de la gestions des annonces** qui est désormais gérer sur un serveur externe, pleins **d'ajouts de gif pour les annonces de streams** que vous avez commencer à voir et que je mettrais à jour régulièrement.\n\n"+
          "**L'hébergeur a également été améliorer en espérant moins de crash innopiné** (*Je croise les doigts*).\n\n"+
          
          "**J'espère que toutes ses nouveautés vont vous plaires**, si vous voyez un **bug** et une **suggestion** pour le bot, n'hésitez pas à le faire dans le <#1060679452146802769>";

class command {
    constructor() {
        this.name = "changelog",
        this.description = "Afficher les mises à jour (STAFF)",
        this.permission = "Administrator"

    }

    
    async execute(bot, interaction) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
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