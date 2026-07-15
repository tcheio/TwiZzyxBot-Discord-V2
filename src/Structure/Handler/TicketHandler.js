const { PermissionsBitField, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const config = require('../../../config');

module.exports = (client) => {
  client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    const category = interaction.customId;

    try {
      // Création du channel avec le nom du joueur + catégorie du ticket
      if (['Report', 'Question', 'Partenariat'].includes(category)) {
        const channel = await interaction.guild.channels.create({
          name: `${interaction.user.username}-${category}`,
          type: ChannelType.GuildText,
          permissionOverwrites: [
            {
              id: interaction.guild.roles.everyone,
              deny: [PermissionsBitField.Flags.ViewChannel],
            },
            {
              id: interaction.user.id,
              allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
            },
            {
              id: config.Info.staff,
              allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
            },
          ],
        });

        // Envoi du message initial avec les boutons dans le channel du ticket
        const ticketEmbed = new EmbedBuilder()
          .setColor('#00FF00')
          .setTitle('Bienvenue dans votre ticket')
          .setDescription('Utilisez les options ci-dessous pour gérer ce ticket.')
          .setTimestamp();

        const ticketRow = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('closeTicket')
              .setLabel('🔒 Fermer le ticket')
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('deleteTicket')
              .setLabel('🗑️ Supprimer le ticket')
              .setStyle(ButtonStyle.Danger)
          );

        await channel.send({
          embeds: [ticketEmbed],
          components: [ticketRow],
        });

        await interaction.reply({ content: `Votre ticket a été créé: ${channel}`, flags: 1 << 6 });
      } else if (category === 'closeTicket') {
        // Fermeture du ticket
        const channel = interaction.channel;

        await channel.permissionOverwrites.set([
          {
            id: interaction.guild.roles.everyone.id,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: config.Info.staff,
            allow: [PermissionsBitField.Flags.ViewChannel],
          },
        ]);

        await interaction.reply({ content: "Le ticket a été fermé.", flags: 1 << 6 });

      } else if (category === 'deleteTicket') {
        // Vérification des permissions
        if (!interaction.member.roles.cache.has(config.Info.staff)) {
          return interaction.reply({ content: "Vous n'avez pas la permission de supprimer ce ticket.", flags: 1 << 6 });
        }

        // Suppression du ticket avec transcription
        const channel = interaction.channel;

        const messages = await channel.messages.fetch({ limit: 100 });
        const transcript = messages.map(msg => `${msg.author.tag}: ${msg.content}`).reverse().join('\n');

        const logChannel = interaction.guild.channels.cache.get(config.channel.log);
        await logChannel.send({
          content: `Transcript du ticket ${channel.name}:`,
          files: [{ attachment: Buffer.from(transcript, 'utf-8'), name: `transcript-${channel.name}.txt` }],
        });

        await interaction.reply({ content: "Le ticket va être supprimé.", flags: 1 << 6 });
        setTimeout(() => channel.delete().catch(err => console.error('[TicketHandler] delete:', err)), 5000);
      }
    } catch (error) {
      console.error('[TicketHandler] interactionCreate (bouton):', error);
    }
  });

  // Fonction pour envoyer ou mettre à jour le message de création de ticket
  client.once('clientReady', async () => {
    const channel = client.channels.cache.get(config.channel.ticket);
    if (!channel) {
      console.warn('[TicketHandler] Salon de tickets introuvable (config.channel.ticket).');
      return;
    }

    const embed = new EmbedBuilder()
      .setColor('#FF0000') 
      .setTitle('Création d\'un ticket')
      .setDescription('**Est-ce que vous voulez signaler un membre du discord?** Vous souhaitez suggérer une collaboration? **Où avez-vous simplement une interrogation?** Nous sommes présents pour vous soutenir! Il vous suffit de sélectionner le bouton correspondant à votre demande pour créer un ticket.\n\n⚠️*Priez de ne pas abuser de cette fonctionnalité. Les tickets inutiles seront supprimés.*⚠️')
      .setTimestamp()
      .setImage(config.clients.banner);

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('Report')
          .setLabel('🚨 Report')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId('Question')
          .setLabel('❓ Question')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('Partenariat')
          .setLabel('🤝 Partenariat')
          .setStyle(ButtonStyle.Success),
      );

    // Recherche des messages dans le channel
    const messages = await channel.messages.fetch({ limit: 10 });
    const botMessage = messages.find(msg => msg.author.id === client.user.id);

    if (!botMessage) {
      await channel.send({
        embeds: [embed],
        components: [row],
      });
    }
  });
};
