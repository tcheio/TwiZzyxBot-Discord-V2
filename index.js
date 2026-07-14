const { Client, GatewayIntentBits, Collection, Options } = require('discord.js');
const config = require('./config');
const annonceAutoTwitch = require('./src/Events/Reseaux/annonceTwitch');
const repingTwitch = require('./src/Events/Reseaux/repingTwitch');
const annonceYouTube = require('./src/Events/Reseaux/annonceYouTube');
const ticketHandler = require('./src/Structure/Handler/TicketHandler');

// Empêche un rejet de promesse non géré (ex: erreur dans une commande ou un event)
// de faire crasher tout le process Node (comportement par défaut depuis Node 15+).
process.on('unhandledRejection', (error) => {
    console.error('[unhandledRejection]', error);
});
process.on('uncaughtException', (error) => {
    console.error('[uncaughtException]', error);
});

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        // Nécessaire pour l'event guildBanAdd (annonce de ban dans joinLeave.js) :
        // sans cet intent Discord ne délivre jamais cet event, même si on l'écoute.
        GatewayIntentBits.GuildModeration
    ],
    // Évite une croissance illimitée des caches sur les longs uptimes.
    makeCache: Options.cacheWithLimits({
        ...Options.DefaultMakeCacheSettings,
        MessageManager: 200,
        PresenceManager: 0,
        GuildStickerManager: 0,
        GuildEmojiManager: 0,
    }),
});

bot.commands = new Collection();

module.exports = bot;

bot.on('messageCreate', (message) => {
    switch (message.channelId) {
        case config.channel.twitch:
            annonceAutoTwitch(bot, message).catch(err => console.error('[annonceAutoTwitch]', err));
            break;
        case config.channel.reping:
            repingTwitch(bot, message).catch(err => console.error('[repingTwitch]', err));
            break;
        case config.channel.chainePrincipal:
        case config.channel.twizzyxReplay:
            annonceYouTube(bot, message).catch(err => console.error('[annonceYouTube]', err));
            break;
    }
});

// Initialisation des gestionnaires d'événements et de commandes
require('./src/Structure/Handler/Event')(bot, { joinLeaveChannelId: config.channel.joinleave });
require('./src/Structure/Handler/Command')(bot);

// Initialisation du gestionnaire de tickets
ticketHandler(bot);

bot.login(config.clients.token);
