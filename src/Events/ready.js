const { ActivityType, EmbedBuilder } = require('discord.js');
const config = require('../../config');
const tabStream = require("../../index");


module.exports = {
    name: 'ready',
    execute(client) {
        console.log('\x1b[33m' + `Connectés à ${client.user.username} !\n` + '\x1b[33m' + `-> Le bot est utilisé sur ${client.guilds.cache.size} serveurs !`);


        tabAllStream = [" 🐺LG UHC "," 🍥NARUTO UHC "," 🍌MARDI Z*ZI "," 👺DEMON SLAYER UHC "," 🏰KILL LA KILL UHC "," 🃏EIGHTY SIX UHC "," ☠️DEATH NOTE UHC ",
                        " 🔎SHERLOCK UHC "," 🏴‍☠️ONE PIECE UHC "," 💥THE BOYS UHC "," ⚔️ATTACK ON TITAN UHC "," ⚽INAZUMA ELEVEN 3: Les Ogres attaquent "," ⚽INAZUMA ELEVEN GO STRIKERS 2013 ",
                        " 🔎AMONG US ", " 🏰SKY DEFENDER "," 🧪FMA UHC "," 🖥️CODE LYOKO TIME ", " 🐲POKEMON ROSA RANDOM "," 🐲POKEMON RUBIS OMEGA ULTRA RANDOM "];

        msg = "";

        var now = new Date();
        const prefix = new EmbedBuilder()
        .setColor('#CB7AFF') 
        .setTitle('<:Twitch:748225816973803562>**__Préfixe à mettte en titre de stream:__**');
        for (i = 0; i < tabAllStream.length; i++){
            msg2 += tabAllStream[i]+"\n";
        }
        prefix.setDescription(msg)
        prefix.setTimestamp()
        prefix.setFooter({ text: config.clients.name, iconURL: config.clients.logo});

        client.channels.cache.get("1033326900564738048").send({ embeds: [prefix] });

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