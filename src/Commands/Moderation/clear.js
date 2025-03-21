const { EmbedBuilder, PermissionsBitField, MessageFlags } = require('discord.js');
const config = require('../../../config');

function temps(){
    var now = new Date();
    let minute = now.getMinutes().toString();
    if (minute.length == 1){ minute = "0"+now.getMinutes(); }

    let mois = parseInt((now.getUTCMonth()+1)).toString();
    if (mois.length == 1){ mois = "0"+parseInt((now.getUTCMonth()+1)); }

    let tempsDate = now.getHours()+":"+minute+", le " + now.getDate()+"/"+mois+"/"+now.getFullYear();

    return tempsDate;
}

class command {
    constructor() {
        this.name = "clear",
        this.description = "Permets de supprimer un certain nombre de messages.",
        this.category = "Moderation",
        this.permission = "Gérer les messages",
        this.options = [
            { 
                type: 10, 
                name: "nombre", 
                description: "Nombre (1-99).", 
                required: true 
            },
            { 
                type: 6, 
                name: "membre", 
                description: "Sélectionner un membre", 
                required: false
            },
        ]
    }

    async execute(bot, interaction) {
        console.log(interaction.channel);
        const Embed = new EmbedBuilder()
        .setColor('Random')
        .setTitle('👮‍♂️ **Action de modération**')
        .setTimestamp()
        .setFooter({ text: config.clients.name, iconURL: config.clients.logo });

        if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            const args = interaction.options.getNumber('nombre');
            const user = interaction.options.getMember('membre');

            if (user) {
                const Channel = interaction.channel;
                const Messages = await Channel.messages.fetch();
                const TargetMessages = Messages.filter((m) => m.author.id === user.id).first(args);

                await Channel.bulkDelete(TargetMessages, true).then(() => {
                    interaction.reply({
                        embeds: [Embed.setDescription(`✅ | **Clear de ${args} messages du membre ${user.toString()}** !`)],
                        flags: MessageFlags.Ephemeral
                    });
                    bot.channels.cache.get(config.channel.log).send(`${args} message(s) ont été supprimés par ${interaction.user}, à ${temps()}`);
                }).catch((err) => {
                    interaction.reply({
                        embeds: [Embed.setDescription(`❌ | **J'ai rencontré une erreur : ${err}**`)],
                        flags: MessageFlags.Ephemeral
                    });
                });
            } else if (args >= 1 && args <= 100) {
                await interaction.channel.bulkDelete(args, true).then(() => {
                    interaction.reply({
                        embeds: [Embed.setDescription(`✅ | **Clear de ${args} messages** !`)],
                        flags: MessageFlags.Ephemeral
                    });
                    bot.channels.cache.get(config.channel.log).send(`${args} message(s) ont été supprimés par ${interaction.user}, à ${temps()}`);
                }).catch((err) => {
                    interaction.reply({
                        embeds: [Embed.setDescription(`❌ | **J'ai rencontré une erreur : ${err}**`)],
                        flags: MessageFlags.Ephemeral
                    });
                });
            } else {
                interaction.reply({
                    embeds: [Embed.setDescription(`❌ | **Tu n'as pas spécifié un nombre -> (1-99)** !`)],
                    flags: MessageFlags.Ephemeral
                });
            }
        } else {
            interaction.reply({
                embeds: [Embed.setDescription(`❌ | **Tu n'as pas la permission d'exécuter cette commande** !`)],
                flags: MessageFlags.Ephemeral
            });
        }
    }
}

module.exports = command;
