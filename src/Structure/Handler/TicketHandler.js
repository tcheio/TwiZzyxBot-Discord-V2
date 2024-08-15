const { PermissionsBitField, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = (client) => {
  client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    const category = interaction.customId;

    // Création du channel avec le nom du joueur + catégorie du ticket
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
          id: '&1052524548811132938', // Remplace par l'ID de ton rôle
          allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
        },
      ],
    });

    await interaction.reply({ content: `Votre ticket a été créé: ${channel}`, ephemeral: true });
  });

  // Fonction pour envoyer ou mettre à jour le message de création de ticket
  client.on('ready', async () => {
    const channel = client.channels.cache.get('1273580872267988992'); // Remplace par l'ID de ton channel

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

    const message = await channel.messages.fetch({ limit: 1 });
    if (message.size === 0) {
      await channel.send({
        content: 'Création d\'un ticket\n\nSélectionnez l\'une des options ci-dessous pour créer un ticket.',
        components: [row],
      });
    } else {
      await message.first().edit({
        content: 'Création d\'un ticket\n\nSélectionnez l\'une des options ci-dessous pour créer un ticket.',
        components: [row],
      });
    }
  });
};
