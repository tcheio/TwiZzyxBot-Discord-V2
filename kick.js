const { EmbedBuilder, ReactionCollector, Client } = require('discord.js');
const config = require('../../../config');


class command {
    constructor() {
        this.name = "kick",
        this.description = "Expulse une personne",
        this.option = [
            {
                type: "user",
                name:"membre",
                description: "Membre que vous souhaitez kick",
                required: true
            },

            {
                type: "string",
                name:"raison",
                description:"Raison du kick",
                required: false
            }
        ]
    }

    async execute(bot, interaction,args) {
        try{

            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return interaction.reply("Ce membre n'existe pas")
            let member = interaction.guild.members.cache.get(user.id)

            let reason = args.get("raison").value;
            if(!reason) reason="Pas de raison fournie.";


            if (interaction.user.id == user.id) return message.reply("Essaie pas de te de ban toi même bouffon !")
            if ((await interaction.guild.fetchOwner()).id === user.id) return message.reply("On ne ban pas le big boss !")
            if (!member?.bannable) return message.reply("Tu ne peux pas ban ce membre")
            if (member && interaction.member.role.highest.comparePositionTo(member.role.highest) <= 0) return message.reply("Il est plus important que toi t'a rien compris")
        }

        catch (err) {

            return message.reply("Pas de membre à bannir.")
        }
  }
};


module.exports = command