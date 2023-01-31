module.exports = {
    name: 'interactionCreate',
    execute(interaction, bot) {
        if(interaction.channel === null) return
        if(!interaction.isCommand()) return
        if(!bot.commands.has(interaction.commandName)) return
        try {
            bot.commands.get(interaction.commandName).execute(bot, interaction)
        } catch (error) {
            console.error(error)
        }

        if (interaction.channelId == "1061410003300397066"){
            bot.channels.cache.get('1061413496564219926').send("Réussite");
        }
    }
}