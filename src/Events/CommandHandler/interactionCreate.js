module.exports = {
    name: 'interactionCreate',
    async execute(interaction, bot) {
        if(interaction.channel === null) return
        if(!interaction.isCommand()) return
        if(!bot.commands.has(interaction.commandName)) return
        try {
            await bot.commands.get(interaction.commandName).execute(bot, interaction)
        } catch (error) {
            console.error(`[Command:${interaction.commandName}]`, error)
        }
    }
}