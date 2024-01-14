const config = require('../../config');
const { EmbedBuilder } = require('discord.js'); 
const classique = require('../Fonctions/Classique');
const twitch = require('../Fonctions/Twitch');



module.exports = async function annonceAutoTwitch(message) {
    if (message.channelId == config.channel.envoie){ //Channel #twitch channel retour
        mention = "<@&748220271839805520>";
        if (skipLive){
            if (AllLive == false){
                AllLive = true;
                mention = "@everyone";
            }
            msg = message.content;
            jeu = twitch.chercheJeu(msg);

            //Recherche Classique
            titre = twitch.titreTravail(msg);
            console.log(titre);
            desc = twitch.descriptionTravail(msg);
            console.log(desc);
            minia = twitch.chercheMinia(titre,jeu);

            //Recherche Event spécial
            /*titre = twitch.titreTravail2(msg);
            console.log(titre);
            desc = twitch.descriptionTravail2(msg);
            console.log(desc);
            categorie = twitch.chercheVraiTitre(titre);
            console.log(categorie);
            minia = twitch.chercheMinia(categorie,jeu);*/

                const TWITCH = new EmbedBuilder()
                    .setColor('#9B00FF')
                    .setTitle("**"+twitch.emoteTitre(titre)+"**")
                    .setDescription(desc)
                    .setURL("https://www.twitch.tv/twizzyxpassympa")
                    .setAuthor({ name: 'TwiZzyxPasSympa', iconURL: 'https://media.discordapp.net/attachments/1064189139349684244/1064189177060663326/channels4_profile.jpg?width=671&height=671', url: 'https://www.twitch.tv/twizzyxpassympa' })
                    .addFields(
                        {name: '<:Twitch:748225816973803562>TwiZzyx est en stream sur Twitch', value: "C'est zinzin" },
                        {name: "Joue à", value: jeu})
                    .setThumbnail("https://media.discordapp.net/attachments/1064189139349684244/1064189177060663326/channels4_profile.jpg?width=671&height=671")
                    .setImage(minia)
                    .setTimestamp()
                    .setFooter({ text: config.clients.name, iconURL: config.clients.logo});
                bot.channels.cache.get(config.channel.retour).send({ embeds: [TWITCH] });
                bot.channels.cache.get(config.channel.retour).send(mention).then(sentMessage => {
                    sentMessage.delete({ timeout: 1000 });
                })
                .catch(console.error);;
    
            //log serveur
            console.log("Un live a été publié à "+classique.temps());
            bot.channels.cache.get(config.channel.logTest).send("Un live a été publié à "+classique.temps());
        }

        else if (skipLive == false){
            skipLive = true;
            //Message dans le général staff
            bot.channels.cache.get(config.channel.retour).send("Un live aurait du être annoncé, <@209395375474212865> n'oublie pas de faire l'annonce et la variable skipLive est de nouveau en "+skipLive);
        }
        
        

    }
};
