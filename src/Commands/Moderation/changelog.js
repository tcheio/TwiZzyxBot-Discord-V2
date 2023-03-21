const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../../../config');

const msg="- **Fix des perms commandes** (Le staff peut enfin utiliser les commandes de STAFF\n"+
          "- **Fix des annonces de shorts (Vraiment une petite bêtises à tout niquer)\n"+
          "- **Fix des annonces Mardi Zizi (Un caractère anti slash était ajouter qui est innexploitable) -> Désormais les MZ seront nomme soit `Mardi Z#zi` ou `Mardi Zlzi` et le pire c'est que j'ai fais ça pour rien\n\n"+

          'Cette version du bot est donc normalement terminé à "100%" (Sauf correctif très mineur et ajout de nouveau stream type). Je travaille déjà sur la prochaine donc je suis toujours preneur de vos idées de commandes que vous souhaitez voir.'

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