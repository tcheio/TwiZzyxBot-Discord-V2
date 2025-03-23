const { EmbedBuilder, PermissionsBitField, MessageFlags } = require('discord.js');
const config = require('../../../config');

function temps() {
    const now = new Date();
    const minute = String(now.getMinutes()).padStart(2, '0');
    const mois = String(now.getUTCMonth() + 1).padStart(2, '0');
    return `${now.getHours()}:${minute}, le ${now.getDate()}/${mois}/${now.getFullYear()}`;
}

class command {
    constructor() {
        this.name = "clear";
        this.description = "Permets de supprimer un certain nombre de messages.";
        this.category = "Moderation";
        this.permission = "Gérer les messages";
        this.options = [
            { type: 10, name: "nombre", description: "Nombre (1-99).", required: true },
            { type: 6, name: "membre", description: "Sélectionner un membre", required: false }
        ];
    }

    async execute(bot, interaction) {
        const Embed = new EmbedBuilder()
            .setColor('Random')
            .setTitle('👮‍♂️ **Action de modération**')
            .setTimestamp()
            .setFooter({ text: config.clients.name, iconURL: config.clients.logo });

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interaction.reply({
                embeds: [Embed.setDescription("❌ | **Tu n'as pas la permission d'exécuter cette commande** !")],
                flags: MessageFlags.Ephemeral
            });
        }

        const args = interaction.options.getNumber('nombre');
        const user = interaction.options.getMember('membre');

        if (args < 1 || args > 100) {
            return interaction.reply({
                embeds: [Embed.setDescription("❌ | **Tu n'as pas spécifié un nombre valide (1-99)** !")],
                flags: MessageFlags.Ephemeral
            });
        }

        const Channel = interaction.channel;
        const Messages = await Channel.messages.fetch({ limit: 100 });

        if (user) {
            const filtered = Messages
                .filter(m => m.author.id === user.id && (Date.now() - m.createdTimestamp) < 14 * 24 * 60 * 60 * 1000)
                .first(args);

            const toDelete = Array.isArray(filtered) ? filtered : [filtered];

            if (!toDelete[0]) {
                return interaction.reply({
                    embeds: [Embed.setDescription(`❌ | Aucun message récent trouvé pour ${user}`)],
                    flags: MessageFlags.Ephemeral
                });
            }

            try {
                await Channel.bulkDelete(toDelete, true);
                interaction.reply({
                    embeds: [Embed.setDescription(`✅ | **Clear de ${toDelete.length} messages du membre ${user}** !`)],
                    flags: MessageFlags.Ephemeral
                });
                bot.channels.cache.get(config.channel.log).send(
                    `🧹 ${toDelete.length} message(s) de ${user.user.tag} ont été supprimés par ${interaction.user} à ${temps()}`
                );
            } catch (err) {
                interaction.reply({
                    embeds: [Embed.setDescription(`❌ | **Erreur : ${err}**`)],
                    flags: MessageFlags.Ephemeral
                });
            }
        } else {
            try {
                const deleted = await Channel.bulkDelete(args, true);
                interaction.reply({
                    embeds: [Embed.setDescription(`✅ | **Clear de ${deleted.size} messages** !`)],
                    flags: MessageFlags.Ephemeral
                });
                bot.channels.cache.get(config.channel.log).send(
                    `🧹 ${deleted.size} message(s) ont été supprimés par ${interaction.user} à ${temps()}`
                );
            } catch (err) {
                interaction.reply({
                    embeds: [Embed.setDescription(`❌ | **Erreur : ${err}**`)],
                    flags: MessageFlags.Ephemeral
                });
            }
        }
    }
}

module.exports = command;
