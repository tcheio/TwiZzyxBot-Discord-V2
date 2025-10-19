const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require('./config');
const annonceAutoTwitch = require('./src/Events/Reseaux/annonceTwitch');
const repingTwitch = require('./src/Events/Reseaux/repingTwitch');
const annonceYouTube = require('./src/Events/Reseaux/annonceYouTube');
const ticketHandler = require('./src/Structure/Handler/TicketHandler');
const registerJoinLeave = require('./src/Events/joinLeave');
const configTest = require('./config-test');

const bot = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ]
});

bot.commands = new Collection();

module.exports = bot;

// Constantes
skipVideo = true;
skipLive = true;
AllLive = true;

bot.on('messageCreate', (message) => {
    annonceAutoTwitch(bot, message);
    repingTwitch(bot, message);
    annonceYouTube(bot, message);
});

// Initialisation des gestionnaires d'événements et de commandes
require('./src/Structure/Handler/Event')(bot, { joinLeaveChannelId: config.channel.joinleave });
require('./src/Structure/Handler/Command')(bot);

// Initialisation du gestionnaire de tickets
//ticketHandler(bot);

bot.login(config.clients.tokenTest);
