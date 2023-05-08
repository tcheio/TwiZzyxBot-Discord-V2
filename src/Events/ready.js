const { ActivityType, EmbedBuilder } = require('discord.js');
const config = require('../../config');
const tabStream = require("../../index");


module.exports = {
    name: 'ready',
    execute(client) {
        remindPlanning = [];
        console.log('\x1b[33m' + `Connectés à ${client.user.username} !\n` + '\x1b[33m' + `-> Le bot est utilisé sur ${client.guilds.cache.size} serveurs !`);


        tabAllStream = [" 🐺LG UHC "," 🍥NARUTO UHC "," 👺DEMON SLAYER UHC "," 🏰KLK UHC "," 🏰KLK UHC V2 "," 🃏EIGHTY SIX UHC "," ☠️DEATH NOTE UHC ",
                        " 🔎SHERLOCK UHC "," 🏴‍☠️ONE PIECE UHC "," 💥THE BOYS UHC "," ⚔️ATTACK ON TITAN UHC "," 🧪FMA UHC ","\n:video_game:**__Multigaming:__**"," ⚽INAZUMA ELEVEN 3: Les Ogres attaquent "," ⚽INAZUMA ELEVEN GO STRIKERS 2013 ",
                        " 🔎AMONG US ", " 🏰SKY DEFENDER "," 🖥️CODE LYOKO TIME ", " 🦇Batman Arkham Asylum "," 🍌MARDI Z*ZI "];

        msg = "\n\n**Ils sont à mettre obligatoirement dans le titre de stream à la place suivante:**\n"+
        "TwiZzyx - `préfixe ici` - Description | (!commande)\n\n<:minecraft:1057270445658869830>**__UHC__**\n";

        var now = new Date();
        channel = "1033326900564738048";
        //client.channel.delete;

        const prefix = new EmbedBuilder()
        .setColor('#CB7AFF') 
        .setTitle('<:Twitch:748225816973803562>**__Préfixe à mettre en titre de stream:__**');
        for (i = 0; i < tabAllStream.length; i++){
            msg += tabAllStream[i]+"\n";
        }
        prefix.setDescription(msg)
        prefix.setTimestamp()
        prefix.setFooter({ text: config.clients.name, iconURL: config.clients.logo});

        client.channels.cache.get("1064817596261728356").send({ embeds: [prefix] });

        const activities = [
            "twitch.tv/twizzyxpassympa",
            "Vidéo tous les samedis à 15H",
            "Je suis une fraude",
            "Suis-je réel ?",
            "GROS PROJET EN 2023"
        ];
    
        setInterval(()=>{
        const inter = activities[Math.floor(Math.random()*activities.length)];
        client.user.setActivity(inter, { type: ActivityType.Streaming})},5000
        );




        
          
    }
}