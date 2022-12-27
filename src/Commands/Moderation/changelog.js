const { EmbedBuilder, ReactionCollector, User } = require('discord.js');
const config = require('../../../config');

const msg="- Fix de la commande /videoskip et /videounskip (afin d'éviter le problème des everyones en boucle)\n- Suppréssion et ajout de nouveaux emoji sur le serv → <:SuperBall:1057269743150698506> <:HyperBall:1057269781327265923> <:MardiZizi:1057269829666611283> <:MarkEvans:1057270465300791296>\n\n**De grosses nouveautés arriveront après les fêtes, je n'ai pas vraiment le temps en ce moment mais on y arrive.**";

class command {
    constructor() {
        this.name = "changelog",
        this.description = "Afficher les mises à jour (STAFF)"
    }

    
    async execute(bot, interaction) {
        skipVideo = false;
        const SKIP = new EmbedBuilder()
        .setColor('#E49B0F')
        .setTitle('⚙**__Mise à jour du 27/12/2022__**')
            .setDescription(msg)
            .setTimestamp()
            .setFooter({ text: config.clients.name, iconURL: config.clients.logo});

        interaction.reply({ embeds: [SKIP] });
    }
}

module.exports = command