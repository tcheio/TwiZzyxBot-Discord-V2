module.exports = {
    name: 'interactionCreate',
    execute(interaction, bot) {
        if(interaction.channel === null) return
        if(!interaction.isCommand()) return
        if(!bot.commands.has(interaction.commandName)){
            console.log("yo");
            if (interaction.member.permissions.has('ADMINISTRATOR')) {
                message.reply('Vous devez être administrateur pour exécuter cette commande.');
                return;
              }
            return

            
        }
        
        try {
            bot.commands.get(interaction.commandName).execute(bot, interaction)
        } catch (error) {
            console.error(error)
        }
    }
}