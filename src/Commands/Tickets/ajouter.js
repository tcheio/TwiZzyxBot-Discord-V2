const { MessageFlags } = require('discord.js');
const config = require('../../../config');

class command {
    constructor() {
        this.name = "ajouter";
        this.description = "Ajouter un utilisateur au ticket.";
        this.category = "Tickets";
        this.options = [
            { type: 6, name: "utilisateur", description: "Sélectionnez un utilisateur à ajouter au ticket", required: true },
        ];
    }

    async execute(bot, interaction) {
        const user = interaction.options.getUser('utilisateur');
        const channel = interaction.channel;

        const isOwnTicket = channel.name.startsWith(`${interaction.user.username}-`);
        const isStaff = interaction.member.roles.cache.has(config.Info.staff);
        if (!isOwnTicket && !isStaff) {
            return interaction.reply({ content: 'Cette commande ne peut être utilisée que dans votre propre ticket.', flags: MessageFlags.Ephemeral });
        }

        try {
            await channel.permissionOverwrites.create(user, {
                ViewChannel: true,
                SendMessages: true,
            });

            return interaction.reply({ content: `${user.tag} a été ajouté au ticket.` });
        } catch (error) {
            console.error('[ajouter] Erreur lors de l\'ajout de l\'utilisateur au ticket:', error);
            return interaction.reply({ content: 'Une erreur est survenue lors de l\'ajout de l\'utilisateur.', flags: MessageFlags.Ephemeral });
        }
    }
}

module.exports = command;
