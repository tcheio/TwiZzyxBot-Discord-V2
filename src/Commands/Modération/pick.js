const { EmbedBuilder, ReactionCollector } = require('discord.js');
const config = require('../../../config');


class command {
    constructor() {
        this.name = "pick",
        this.description = "Tirage au sort réaction"
    }

    async execute(bot, interaction) {
        
    }
}

module.exports = command