module.exports = {
    name: 'ready',
    once: true,
    execute(bot) {
        bot.application.commands.set(bot.commands.map(({ execute, ...data }) => data))
    }
}