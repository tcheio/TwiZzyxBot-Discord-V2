const { EmbedBuilder, ReactionCollector, User } = require('discord.js');
const config = require('../../../config');
const Permissions = require('../../Permissions');
const Fonction = require('../../Classes/Fonction.js');


class command {
    constructor() {
        this.name = "reping",
        this.description = "Réactiver l'annonce automatique d'un stream (STAFF)",
        this.permission = Permissions.Administrator
    }


    // exécuter la commande ici
    async execute(bot, interaction) {
        const TWITCH = new EmbedBuilder()
                    .setColor('#9B00FF')
                    .setTitle("**🍌Mardi Z*ZI**")
                    .setDescription("C'est Mardi et Mardi c'est soirée zizi")
                    .setURL("https://www.twitch.tv/twizzyxpassympa")
                    .setAuthor({ name: 'TwiZzyxPasSympa', iconURL: 'https://media.discordapp.net/attachments/1064189139349684244/1064189177060663326/channels4_profile.jpg?width=671&height=671', url: 'https://www.twitch.tv/twizzyxpassympa' })
                    .addFields(
                        {name: 'TwiZzyx est en stream sur Twitch', value: "C'est zinzin" },
                        {name: "Joue à", value: "Make it Même"})
                    .setThumbnail("https://media.discordapp.net/attachments/1064189139349684244/1064189177060663326/channels4_profile.jpg?width=671&height=671")
                    .setImage("https://media.discordapp.net/attachments/1064668600285282315/1064679234506858558/MARDI_ZIZI_LOGO_1.gif")
                    .setTimestamp()
                    .setFooter({ text: config.clients.name, iconURL: config.clients.logo});
                bot.channels.cache.get("749975416944721940").send({ embeds: [TWITCH] });
                bot.channels.cache.get("749975416è944721940").send("<@&748220271839805520>")
                .then(sentMessage => {
                    sentMessage.delete({ timeout: 2000 });
                })
                .catch(console.error);;

            //log serveur
            console.log("Un live a été publié à "+Fonction.temps());
            //bot.channels.cache.get('1060946019333976204').send("Un live a été publié à "+temps());

    }
}

module.exports = command