const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../../../config');
const Permissions = require('../../Permissions');

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
        this.name = "liveunskip",
        this.description = "Réactiver l'annonce automatique d'un stream (STAFF)",
        this.permission = "ManageMessages"
    }


    // exécuter la commande ici
    async execute(bot, interaction) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            skipLive = true;
            const SKIP = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('✅ **__Le prochain stream sera pas annoncé__**')
            .setDescription("Annonce auto réactivé.")
            .setTimestamp()
            .setFooter({ text: config.clients.name, iconURL: config.clients.logo});
            
            interaction.reply({ embeds: [SKIP] });
            console.log("Les annonces de live sont à nouveau en automatique.")
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

            bot.channels.cache.get('1060946019333976204').send("Les annonces de live ont été remis en automatique par "+interaction.author+", à "+temps());
    }
}

module.exports = command