const { ActivityType, EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../../config');
const tabStream = require("../../index");


module.exports = {
    name: 'ready',
    execute(client) {
        
        console.log('\x1b[33m' + `Connectés à ${client.user.username} !\n` + '\x1b[33m' + `-> Le bot est utilisé sur ${client.guilds.cache.size} serveurs !`);

        const activities = [
            "twitch.tv/twizzyxpassympa",
            "Vidéo tous les samedis à 15H",
            "Suis-je réel ?",
            "C'est l'heure du DU-DU-DU DUEL !",
        ];
    
        setInterval(()=>{
        const inter = activities[Math.floor(Math.random()*activities.length)];
        client.user.setActivity(inter, { type: ActivityType.Streaming})},10000
        );
          
    }
}