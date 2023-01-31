const { EmbedBuilder, ReactionCollector, User } = require('discord.js');
const config = require('../../../config');

const msg="\n\n**Ils sont à mettre obligatoirement dans le titre de stream à la place suivante:**\n"+
          "TwiZzyx - `préfixe ici` - Description | (!commande)\n\n"+
          "<:minecraft:1057270445658869830>**__UHC__**\n"+
          "-🍥NARUTO UHC\n-👺DEMON SLAYER UHC\n-🏰KILL LA KILL UHC\n-🔎SHERLOCK UHC\n-🐺LG UHC\n-🏴‍☠️ONE PIECE UHC\n-💥THE BOYS UHC\n\n"+
          "🎮**__MultiGaming:__**\n"+
          "-⚽INAZUMA ELEVEN 2 : Tempête de Glace\n-⚽INAZUMA ELEVEN GO STRIKERS 2013\n-🔎Among US\n-🍌MARDI Z*ZI";

class command {
    constructor() {
        this.name = "liveprefix",
        this.description = "Affiche les préfixes de streams à mettre (STAFF)"
    }

    
    async execute(bot, interaction) {
        var now = new Date();
        skipVideo = false;
        const SKIP = new EmbedBuilder()
        .setColor('#CB7AFF') 
        .setTitle('<:Twitch:748225816973803562>**__Préxife à mettte en titre de stream:__**')
            .setDescription(msg)
            .setTimestamp()
            .setFooter({ text: config.clients.name, iconURL: config.clients.logo});

        interaction.reply({ embeds: [SKIP] });
    }
}

module.exports = command