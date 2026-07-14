const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../../../config');

const msg = "- Modification des annonces de streams dans le but d'enlever l'anti slash visible à la fin de chaque annonce\n- Ajout d'une nouvelle version des annonces de streams pour les events spéciaux (Live 24H, Marathon, ect)\n\nProbablement la dernière maj de cette version, désormais je travaille sur la prochaine version, plus petite niveau bot mais plus importante pour le discord";
const discordUp = "- REFONTE TOTALE DU DISCORD (grâde et channel)";
const botUp =
            "- Ajout de la commande `help` qui vous permet de connaître toutes les commandes que vous pouvez réaliser sur le serveur en fonction de votre niveau de permission.\n"+
            "- Ajout de la commande `video` qui permet de changer le comportement des annonces de vidéos pour la chaine **TwiZzyx²** et **TwiZzyx Clips**\n"+
            "- Ajout de la commande `live` qui permet de changer le comportement des annonces de streams\n"+
            "- Correctif des annonces de vidéos de la chaine principal\n"+
            "- Optimisation du code notamment de l'attribution des channels géré désormais par un fichier config évitant les confusions dans le code\n";

class command {
    constructor() {
        this.name = "changelog",
        this.description = "Afficher les mises à jour (STAFF)",
        this.permission = "Administrator"

    }

    
    async execute(bot, interaction) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        var now = new Date();
        const changelog = new EmbedBuilder()
        .setColor('#E49B0F')
        .setTitle('⚙**__Mise à jour du '+now.getDate()+'/0'+(parseInt(now.getUTCMonth())+1)+'/'+now.getFullYear()+'__** - __**V2.3.2**__')
            .setDescription(msg)
            .setTimestamp()
            //.addFields(
            //    {name:"Discord", value:discordUp},
            //    {name:"Bot", value: botup},
            //    {name: "Pour signaler un quelconque bug, problème ou idée de changement, merci de le signaler directement dans le <#1060679452146802769>", value:"Il s'agit de la deuxième partie de la mise à jour précédente comportant la plupart des ajouts que je n'avais pas finit la denrière fois et quelques correctifs et ajouts léger sur le discord.\nLa prochaine mise à jour arrivera fin août avec un énorme changement sur le discord en particulier."}
            //    )
            .setFooter({ text: config.clients.name, iconURL: config.clients.logo});

        interaction.reply({ embeds: [changelog] });
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