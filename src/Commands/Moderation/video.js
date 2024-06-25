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
        this.name = "video",
        this.description = "Changer le channel d'annonce vidéo (STAFF)",
        this.permission = "ManageMessages"
        this.options = [
            { 
                type: 3, 
                name: "action", 
                description: "Comportement de l'annonce", 
                required: true,
            },


        ]
    }

    async execute(bot, interaction) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            const args = interaction.options.getString('action');
            
            if (args == "yt"){
            skipVideo = false;
            const SKIP = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('✅ **__Vidéo changé de destination__**')
                .setDescription("La prochaine vidéo est changé de destination (<#1023891712403312720> → <#748247106980020236>)")
                .setTimestamp()
                .setFooter({ text: config.clients.name, iconURL: config.clients.logo});

            interaction.reply({ embeds: [SKIP] });
            console.log("Une vidéo a été changé de destination")
            }

            else if (args == "lp"){
                skipVideo = true;
                const SKIP = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('✅ **__Vidéo changé de destination__**')
                    .setDescription("La prochaine vidéo est changé de destination (<#748247106980020236> → <#1023891712403312720>)")
                    .setTimestamp()
                    .setFooter({ text: config.clients.name, iconURL: config.clients.logo});

                interaction.reply({ embeds: [SKIP] });
                console.log("Une vidéo a été changé de destination")
        
            }

            else if (args == "cancel"){
                NoneVideo = false;
                const SKIP = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('✅ **__Annonce vidéo annulé__**')
                    .setDescription("La prochaine vidéo ne sera pas annoncée")
                    .setTimestamp()
                    .setFooter({ text: config.clients.name, iconURL: config.clients.logo});

                interaction.reply({ embeds: [SKIP] });
                console.log("La prochaine vidéo ne sera pas annoncée")
            }

            else if (args == "shorts"){
                shorts = false;
                const SKIP = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('✅ **__Annonce Shorts__**')
                    .setDescription("La prochaine vidéo sera annoncée comme un shorts")
                    .setTimestamp()
                    .setFooter({ text: config.clients.name, iconURL: config.clients.logo});

                interaction.reply({ embeds: [SKIP] });
                console.log("La prochaine vidéo sera annoncée comme un shorts");
            }

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

        //bot.channels.cache.get('1060946019333976204').send("Une vidéo a été changer de destination (<#748247106980020236> → <#1023891712403312720>) par "+interaction.author+", à "+temps());
}
}
module.exports = command