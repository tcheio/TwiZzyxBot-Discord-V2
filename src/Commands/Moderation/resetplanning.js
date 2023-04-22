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
        this.name = "planningreset",
        this.description = "Reset le planning de la semaine"
        this.permission = "ManageMessages"
    }

    async execute(bot, interaction) {

        if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
        planning = "https://media.discordapp.net/attachments/1064189056927400048/1079745624628527215/planningPasDispo.png?width=1193&height=671";
        changement = "Pour le moment aucun"
        const SKIP = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('✅ **__Le planning a été réinitialisé__**')
            .setTimestamp()
            .setFooter({ text: config.clients.name, iconURL: config.clients.logo});

        interaction.reply({ embeds: [SKIP] });
        console.log("Une vidéo a été changé de destination")
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
        bot.channels.cache.get('1060946019333976204').send("Le planning a été reset par "+interaction.author+", à "+temps());
    }
}

module.exports = command