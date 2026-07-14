const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../../../config');
const state = require('../../Structure/StreamState');

class command {
    constructor() {
        this.name = "live",
        this.description = "Change la manière d'annoncer un stream",
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
            
            if (args == "all"){
                state.AllLive = false;
                const SKIP = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('✅ **__Le stream sera annoncé à tous__**')
                    .setDescription("Le prochain stream sera annoncé avec une mention everyone.")
                    .setTimestamp()
                    .setFooter({ text: config.clients.name, iconURL: config.clients.logo});

                interaction.reply({ embeds: [SKIP] });
                console.log("Un live a changé de mention.");
            }

            else if (args == "normal"){
                state.AllLive = true;
                const SKIP = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('✅ **__Le stream sera annoncé à tous__**')
                    .setDescription("Le prochain stream sera annoncé comme d'habitude.")
                    .setTimestamp()
                    .setFooter({ text: config.clients.name, iconURL: config.clients.logo});

                interaction.reply({ embeds: [SKIP] });
                console.log("Un live a changé de mention.");
        
            }

            else if (args == "cancel"){
                state.skipLive = false;
                const SKIP = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('✅ **__Le prochain stream ne sera pas annoncé__**')
                .setDescription("Le prochain stream n'aura pas d'annonce auto.")
                .setTimestamp()
                .setFooter({ text: config.clients.name, iconURL: config.clients.logo});

                interaction.reply({ embeds: [SKIP] });
                console.log("Un live a été changé de destination")
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