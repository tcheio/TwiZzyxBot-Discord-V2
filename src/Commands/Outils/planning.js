const { EmbedBuilder } = require('discord.js');
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

    tempsDate = (now.getHours()+1)+":"+minute+", le " + now.getDate()+"/"+mois+"/"+now.getFullYear();

    return tempsDate;
}

class command {
    constructor() {
        this.name = "planning",
        this.description = "Affiche le planning de la semaine en cours"
    }

    async execute(bot, interaction) {
        if (planning != "https://media.discordapp.net/attachments/1064189056927400048/1079745624628527215/planningPasDispo.png?width=1193&height=671"){
        const PLANNING = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('<:Twitch:748225816973803562>__**PLANNING DE LA SEMAINE:**__<:YouTube:748225835269488751>')
            .setDescription("Tu cherches à savoir quand notre TwiZzyx fait du contenu que ce soit en live ou en vidéo ?")
            .addFields(
                { name: 'Voici le planning', value: "Plus d'info dans le channel <#869280110304436304>" },
                { name: "Des changements de programmes de prévu ?", value: changement})
            .setImage(planning)
            .setTimestamp()
            .setFooter({ text: config.clients.name, iconURL: config.clients.logo});

        interaction.reply({ embeds: [PLANNING] });
        console.log("Un utilisateur à utilisé la commande /planning")
        //bot.channels.cache.get('1060946019333976204').send("Un utilisateur à utilisé la commande /planning à "+temps());
        }

        else {
            const PLANNING = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(':warning:__**ERREUR PLANNING**__')
            .setDescription("Je n'arrive pas à accéder au planning de la semaine.\nCela peut-être lié à 2 choses:")
            .addFields(
                { name: "- TwiZzyx n'a pas encore publié le nouveau planning et donc il va falloir attendre un peu la publication de ce dernier dans le <#869280110304436304>", value: "- **Le planning a pourtant déjà été publié en théorie et il s'agit donc d'une erreur donc n'hésitez pas à mentionner TwiZzyx**" })
            .setImage(planning)
            .setTimestamp()
            .setFooter({ text: config.clients.name, iconURL: config.clients.logo});

        interaction.reply({ embeds: [PLANNING] });
        console.log("Un utilisateur à utilisé la commande /planning")
        //bot.channels.cache.get('1060946019333976204').send("Un utilisateur à utilisé la commande /planning à "+temps());
        }
    }
}

module.exports = command