const { PermissionsBitField, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../../config');

module.exports = (client) => {
  client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    const category = interaction.customId;

    if (interaction.isButton()) {
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
              id: '1052524548811132938', // Remplace par l'ID de ton rôle staff
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

        await interaction.reply({ content: `Votre ticket a été créé: ${channel}`, ephemeral: true });
      } else if (category === 'closeTicket') {
        // Fermeture du ticket
        const channel = interaction.channel;

        await channel.permissionOverwrites.set([
          {
            id: interaction.guild.roles.everyone.id,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: '1052524548811132938', // Remplace par l'ID de ton rôle staff
            allow: [PermissionsBitField.Flags.ViewChannel],
          },
        ]);

        await interaction.reply({ content: "Le ticket a été fermé.", ephemeral: true });

      } else if (category === 'deleteTicket') {
        // Vérification des permissions
        if (!interaction.member.roles.cache.has('1052524548811132938')) { // Remplace par l'ID de ton rôle staff
          return interaction.reply({ content: "Vous n'avez pas la permission de supprimer ce ticket.", ephemeral: true });
        }

        // Suppression du ticket avec transcription
        const channel = interaction.channel;

        const messages = await channel.messages.fetch({ limit: 100 });
        const transcript = messages.map(msg => `${msg.author.tag}: ${msg.content}`).reverse().join('\n');

        const logChannel = interaction.guild.channels.cache.get('1273945681979248721'); // Remplace par l'ID de ton channel de logs
        await logChannel.send({
          content: `Transcript du ticket ${channel.name}:`,
          files: [{ attachment: Buffer.from(transcript, 'utf-8'), name: `transcript-${channel.name}.txt` }],
        });

        await interaction.reply({ content: "Le ticket va être supprimé.", ephemeral: true });

        // Supprimer le channel après un délai pour laisser le temps d'envoyer le message
        setTimeout(() => channel.delete(), 5000);
      }
    }
  });

// Commande Slash pour ajouter un utilisateur au ticket
client.on('ready', async () => {
  try {
    // Enregistre la commande globalement
    await client.application.commands.create(
      new SlashCommandBuilder()
        .setName('ajouter')
        .setDescription('Ajouter un utilisateur au ticket.')
        .addUserOption(option =>
          option
            .setName('utilisateur')
            .setDescription('Sélectionnez un utilisateur à ajouter au ticket')
            .setRequired(true)
        )
    );

    console.log('Commande /ajouter enregistrée avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la commande /ajouter:', error);
  }
});

// Gérer la commande /ajouter
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ajouter') {
    const user = interaction.options.getUser('utilisateur');
    const channel = interaction.channel;

    // Vérifie si le channel est un ticket
    if (!channel.name.startsWith(interaction.user.username)) {
      return interaction.reply({ content: 'Cette commande ne peut être utilisée que dans un ticket.', ephemeral: true });
    }

    try {
      await channel.permissionOverwrites.create(user, {
        ViewChannel: true,
        SendMessages: true,
      });

      return interaction.reply({ content: `${user.tag} a été ajouté au ticket.`, ephemeral: false });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur au ticket:', error);
      return interaction.reply({ content: 'Une erreur est survenue lors de l\'ajout de l\'utilisateur.', ephemeral: true });
    }
  }
});

  // Fonction pour envoyer ou mettre à jour le message de création de ticket
  client.on('ready', async () => {
    const channel = client.channels.cache.get('1273580872267988992'); // Remplace par l'ID de ton channel

    // Création de l'embed
    const embed = new EmbedBuilder()
      .setColor('#FF0000') // Couleur de l'embed
      .setTitle('Création d\'un ticket')
      .setDescription('**Est-ce que vous voulez signaler un membre du discord?** Vous souhaitez suggérer une collaboration? **Où avez-vous simplement une interrogation?** Nous sommes présents pour vous soutenir! Il vous suffit de sélectionner le bouton correspondant à votre demande pour créer un ticket.\n\n⚠️*Priez de ne pas abuser de cette fonctionnalité. Les tickets inutiles seront supprimés.*⚠️')
      .setTimestamp()
      .setImage(config.clients.logo);

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
      // Si aucun message envoyé par le bot n'est trouvé, envoie un nouveau message avec l'embed
      await channel.send({
        embeds: [embed],
        components: [row],
      });
    }
  });
};
