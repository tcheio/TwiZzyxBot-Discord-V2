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
        this.name = "stop",
        this.description = "Arrête le bot",
        this.permission = "Administrator"

    }

    async execute(bot, interaction) {
        if (interaction.user.id == "209395375474212865"){
            var now = new Date();
            skipVideo = false;
            const STOP = new EmbedBuilder()
            .setColor('#E49B0F')
            .setTitle('🚨__**Extinction du bot**__')
                .setDescription("Le Bot est sur le point de s'arrêter.")
                .setTimestamp()
                .setFooter({ text: config.clients.name, iconURL: config.clients.logo});

            interaction.reply({ embeds: [STOP] });
            bot.channels.cache.get(config.channel.logTest).send("Le bot a été éteint par "+interaction.user+" à "+temps());
            bot.destroy();
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