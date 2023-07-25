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
        this.name = "animation",
        this.description = "Permet de créer une annonce d'animation",
        this.category = "Moderation",
        this.permission = "Gérer les messages",

        this.options = [
            { 
                type: 10, 
                name: "mdj", 
                description: "Jeu/Mini jeux", 
                required: true,
            },
        ]
    }


    async execute(bot, interaction) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            const args = interaction.options.getString('mdj');

            if (args == "among"){
                const annonce = new EmbedBuilder()
                .setColor('9B00FF')
                .setTitle("**AMONG US**")
                .setDescription("** 8 places minimum** / **15 places maximum**")
                .addFields({name: ':warning:**__Prérequis:__**', value: "- Among Us (PC/Mobile)\n- Vocal Discord"})
                .setImage("https://media.discordapp.net/attachments/1064668600285282315/1066800722861109349/Among_us.gif")
                .setTimestamp()
                .setFooter({ text: config.clients.name, iconURL: config.clients.logo});
                
                interaction.reply({ embeds: [annonce] });
            }

            else if (args == "lgmc"){
                const annonce = new EmbedBuilder()
                .setColor('9B00FF')
                .setTitle("**LG Minecraft**")
                .setDescription("** 8 places minimum** / **12 places maximum**")
                .addFields({name: ':warning:**__Prérequis:__**', value: "- Minecraft prenium\n- Vocal Discord"})
                //.setImage("")
                .setTimestamp()
                .setFooter({ text: config.clients.name, iconURL: config.clients.logo});
                
                interaction.reply({ embeds: [annonce] });
                
            }

            else if (args == "uno"){
                const annonce = new EmbedBuilder()
                .setColor('9B00FF')
                .setTitle("**UNO**")
                .setDescription("** 2 places minimum** / **4 places maximum**")
                .addFields({name: ':warning:**__Prérequis:__**', value: "- UNO sur PC\n- Vocal Discord"})
                //.setImage("")
                .setTimestamp()
                .setFooter({ text: config.clients.name, iconURL: config.clients.logo});
                
                interaction.reply({ embeds: [annonce] });

                
            }

            else if (args == "bus"){
                const annonce = new EmbedBuilder()
                .setColor('9B00FF')
                .setTitle("**Business Tour**")
                .setDescription("** 2 places minimum** / **4 places maximum**")
                .addFields({name: ':warning:**__Prérequis:__**', value: "- Business Tour\n- Vocal Discord"})
                //.setImage("")
                .setTimestamp()
                .setFooter({ text: config.clients.name, iconURL: config.clients.logo});
                
            }

            else if (args == "lg"){
                const annonce = new EmbedBuilder()
                .setColor('9B00FF')
                .setTitle("**🐺LG UHC**")
                .setDescription("** 18 places minimum** / **24 places maximum**")
                .addFields({name: ':warning:**__Prérequis:__**', value: "- Minecraft prenium\n- Mumble Link"})
                .setImage("https://media.discordapp.net/attachments/1101573944538042458/1101574256220962876/LG_UHC_-_IPDL.png?width=1177&height=662")
                .setTimestamp()
                .setFooter({ text: config.clients.name, iconURL: config.clients.logo});
                interaction.reply({ embeds: [annonce] });
            }


            else if (args == "help"){
                const annonce = new EmbedBuilder()
                .setColor('9B00FF')
                .setTitle("**Liste de toutes les animations disponible sur le discord**")
                .setDescription("`lg` ➔ Loup Garou UHC \n`lgmc` ➔ Loup Garou Minecraft\n`uno` ➔ UNO\n`bus` ➔ Business Tour\n`among` ➔ Among US")
                .setTimestamp()
                .setFooter({ text: config.clients.name, iconURL: config.clients.logo});
                interaction.reply({ embeds: [annonce] });
            }
            
        }
}}

module.exports = command