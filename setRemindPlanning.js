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
        this.name = "remindPlanning",
        this.description = "Initialise tous les rappels planning (STAFF)",
        this.permission = "ManageMessages"
    }


    // exécuter la commande ici
    async execute(bot, interaction) {
        live = "";
        heure = 0;

        while (live != "stop"){
            bot.channels.cache.get('1099239814508843028').send("Veuillez saisir le planning du stream:");
            await live;
            bot.channels.cache.get('1099239814508843028').send("Veuillez saisir l'heure du stream suivant:"+live);
            await heure;
            remindPlanning.push([live,heure]);
        }
    }
}

module.exports = command