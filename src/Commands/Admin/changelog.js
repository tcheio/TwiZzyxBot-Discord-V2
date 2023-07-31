const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../../../config');

const msg = "Grosse mise à jour qui ajoute pas mal de choses vu qu'il s'agit de la fusion de 2 mises à jour donc pas mal de contenus.";
const discordUp = "- Retour du grade <@&748220271839805520> à sa couleur d'origine *(Le violet)*\n"+
                "- Ajout de nouveaux émojis <:TwiZzyxYes:1135686224372301826> <:TwiZzyxNo:1135686219796316340> *(2 pour le moment mais je vise 10 avant la rentrée)*\n"+
                "- Ajout d'un Guide Serveur disponible tout en haut du discord aidant ainsi les nouveaux ainsi que ceux déjà présent";
const botup = "- Supression des commandes `liveskip`, `liveunskip`, `videoskip` et `videounskip`\n"+
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
        if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrators)) {
        var now = new Date();
        const changelog = new EmbedBuilder()
        .setColor('#E49B0F')
        .setTitle('⚙**__Mise à jour du '+now.getDate()+'/0'+(parseInt(now.getUTCMonth())+1)+'/'+now.getFullYear()+'__** - __**V2.3**__')
            .setDescription(msg)
            .setTimestamp()
            .addFields(
                {name:"Discord", value:discordUp},
                {name:"Bot", value: botup},
                {name: "Pour signaler un quelconque bug, problème ou idée de changement, merci de le signaler directement dans le <#1060679452146802769>", value:"Il s'agit de la deuxième partie de la mise à jour précédente comportant la plupart des ajouts que je n'avais pas finit la denrière fois et quelques correctifs et ajouts léger sur le discord.\nLa prochaine mise à jour arrivera fin août avec un énorme changement sur le discord en particulier."}
                )
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