const { ActivityType} = require('discord.js');
const config = require('../../config');


module.exports = {
    name: 'ready',
    execute(client) {
        
        console.log('\x1b[33m' + `Connectés à ${client.user.username} !\n` + '\x1b[33m' + `-> Le bot est utilisé sur ${client.guilds.cache.size} serveurs !`);

        const activities = [
            "twitch.tv/twizzyxpassympa",
            "Niah-Niah Le Football pleure",
            "Suis-je réel ?",
            "FIRE TORNADO !!!!!!!!!",
            "C'est l'heure du DU-DU-DU DUEL !",
        ];
    
        setInterval(()=>{
        const inter = activities[Math.floor(Math.random()*activities.length)];
        client.user.setActivity(inter, { type: ActivityType.Streaming})},10000
        );
          
    }
}