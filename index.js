const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require('./config');
const annonceAutoTwitch = require('./src/Events/Reseaux/annonceTwitch');
const repingTwitch = require('./src/Events/Reseaux/repingTwitch');
const annonceYouTube = require('./src/Events/Reseaux/annonceYouTube');

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

//Constantes
skipVideo = true;
shorts = true;
skipLive = true;
AllLive = true;
description = null;

bot.on('messageCreate', (message) => {
    annonceAutoTwitch(bot, message);
    repingTwitch(bot, message);
    annonceYouTube(bot, message);
});

require('./src/Structure//Handler/Event')(bot);
require('./src/Structure//Handler/Command')(bot);


bot.login(config.clients.tokenTest);
