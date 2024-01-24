const { ActivityType, EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../../config');
const tabStream = require("../../index");


module.exports = {
    name: 'ready',
    execute(client) {
        
        //deleteMessage(config.channel.logTest, "1133863942003896423");
        
        console.log('\x1b[33m' + `Connectés à ${client.user.username} !\n` + '\x1b[33m' + `-> Le bot est utilisé sur ${client.guilds.cache.size} serveurs !`);


        tabAllStream = [" LG UHC "," NARUTO UHC "," DEMON SLAYER UHC "," KLK UHC `ou` KLK UHC V2 "," EIGHTY SIX UHC "," DEATH NOTE UHC ",
                        " SHERLOCK UHC "," 🏴ONE PIECE UHC "," THE BOYS UHC "," ATTACK ON TITAN UHC `ou` AOT UHC "," FMA UHC ", " SKY DEFENDER "," JJK UHC "," FDP UHC `ou` DAWA UHC"," 🪄MADOKA UHC "," 👹BLEACH UHC "," 🪓SURVIE ... `ou` 🪓SURVIE HARDCORE "," 🟡FAST BAND UHC ","\n:video_game:**__Multigaming:__**"," ⚽INAZUMA ELEVEN 3: Les Ogres attaquent "," ⚽INAZUMA ELEVEN GO STRIKERS 2013 ",
                        " AMONG US "," CODE LYOKO TIME "," MULTI Z#ZI `ou` MULTI ZlZI", " TWIZZYX DIRECT ", " MONTAGE D'UNE VIDEO AVEC VOUS "];

        msg = "\n\n**Ils sont à mettre obligatoirement dans le titre de stream à la place suivante:**\n"+
        "TwiZzyx - `préfixe ici` - Description | (!commande)\n\n<:minecraft:1057270445658869830>**__MINECRAFT:__**\n";

        var now = new Date();
        const prefix = new EmbedBuilder()
        .setColor('#CB7AFF') 
        .setTitle('<:Twitch:748225816973803562>**__Préfixe à mettre en titre de stream:__**');
        for (i = 0; i < tabAllStream.length; i++){
            msg += tabAllStream[i]+"\n";
        }
        prefix.setDescription(msg)
        prefix.setTimestamp()
        prefix.setFooter({ text: config.clients.name, iconURL: config.clients.logo});

        client.channels.cache.get(config.channel.retour).send({ embeds: [prefix] });


        const activities = [
            "twitch.tv/twizzyxpassympa",
            "Vidéo tous les samedis à 15H",
            "Suis-je réel ?",
        ];
    
        setInterval(()=>{
        const inter = activities[Math.floor(Math.random()*activities.length)];
        client.user.setActivity(inter, { type: ActivityType.Streaming})},5000
        );




        
          
    }
}
