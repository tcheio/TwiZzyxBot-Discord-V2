const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../../../config');

function temps(){
    var now = new Date();
    //Traitement Minute 
    minute = now.getMinutes().toString();
    if (minute.length == 1){ minute = "0"+now.getMinutes(); }

    //Traitement Mois
    mois = parseInt((now.getUTCMonth()+1))
    mois = mois.toString();
    if (mois.length == 1){ mois = "0"+parseInt((now.getUTCMonth()+1)); console.log}

    tempsDate = (now.getHours())+":"+minute+", le " + now.getDate()+"/"+mois+"/"+now.getFullYear();

    return tempsDate;
}

class command {
    constructor() {
        this.name = "description",
        this.description = "Ajoute une description à la prochaine annonce de vidéo (STAFF)",
        this.permission = "ManageMessages"
        this.options = [
            { 
                type: 3, 
                name: "message", 
                description: "Comportement de l'annonce", 
                required: true,
            },


        ]
    }

    async execute(bot, interaction) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            const args = interaction.options.getString("message");
            description = args;

            const Embed = new EmbedBuilder()
            .setColor('#FF9300')
            .setTitle('**Annonce de vidéo**')
            .setTimestamp()
            .setFooter({ text: config.clients.name, iconURL: config.clients.logo})
            .setDescription("La prochaine vidéo sera annoncé avec la description suivante:\n\n"+args);
            interaction.reply({ embeds: [Embed] });

        }

    else {
        const Embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('👮‍♂️ **Action de modération**')
        .setTimestamp()
        .setFooter({ text: config.clients.name, iconURL: config.clients.logo})
        .setDescription("Tu n'as pas la permission d'éxécuter cette commande");
        interaction.reply({ embeds: [Embed] });

        }

        bot.channels.cache.get(config.channel.log).send("Vous avez défini une description pour la prochaine vidéo qui sera annoncée:\n\n"+ description);
    }
}
module.exports = command