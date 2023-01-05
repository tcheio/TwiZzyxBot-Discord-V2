const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require('./config');

const bot = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ]
});

bot.commands = new Collection();


//Constantes
skipVideo = true;
skipLive = true;


function rechercheCaract(msg){
    const msgBis = msg.split(" ");
        if (msgBis[msgBis.length-2] == "#shorts"){
            return true;
        }
        return false;
}

function titreTravail(msg){
    msgBis = msg.split(" ");
    console.log(typeof msgBis);
    for (i = 0; i < msgBis.length; i++){
        if (msgBis[i] == "►"){
            msgBis = msgBis[i+1,msgBis.length];
        }
    }
    console.log(msgBis);
}

//Message d'annonce Live/Tiktok/LP/Clips
bot.on("messageCreate", async message => {
    var now = new Date();
    if (message.channelId == '1033326900564738048'){ //Channel #twitch channel retour
        if (skipLive){
            msg = message.content;
            tabAnnonce = ["**LES GARS, ON PART POUR UN STREAM DE FOLIE**","**T'a rien à faire alors vient me voir en stream**","**T'es obligé de venir donc tu viens stp**","**Ecoute mon gars, je suis un petit streameur et j'ai besoin de toi**"];
            random = Math.floor(Math.random() * (tabAnnonce.length));
            console.log(random);
            console.log(tabAnnonce[random]);
            titre = titreTravail(msg)
            bot.channels.cache.get('1033327634458882069').send("<:Twitch:748225816973803562>"+tabAnnonce[random]+"\n\n"+titre+"\n\n<@&748220271839805520>"); //envoie ce message dans le channel "stream"
            console.log("Un live a été publié à "+ now.getHours()+":"+now.getMinutes()+", le " + now.getDay()+"/"+now.getMonth()+"/"+now.getFullYear());
            //channel retour 2
        }
        else {
            skipLive = true;
            //general
            bot.channels.cache.get('749975416944721940').send("Un live aurait du être annoncé, <@209395375474212865> n'oublie pas de faire l'annonce.");
        }
        
    }

    else if (message.channelId == '1022426108014100500'){ //Channel #clip-lp
        if (skipVideo) {
            msg = message.content;
            console.log("Message: "+msg);
            statut = rechercheCaract(msg);
            if (statut){
                bot.channels.cache.get('892842982112374804').send("<:YouTube:748225835269488751> __**NOUVEAU CLIPS**__\n\n"+msg+"\n\n<@&1014452932713922610>"); //envoie ce message dans le channel "clip"
                console.log("Une vidéo clip a été publié à "+ now.getHours()+":"+now.getMinutes()+", le " + now.getDay()+"/"+now.getMonth()+"/"+now.getFullYear());
            }
            else {
                bot.channels.cache.get('1023891712403312720').send("<:YouTubeBleu:1018805788090839061> __**NOUVELLE VIDEO LET'S PLAY**__ <:YouTubeBleu:1018805788090839061>\n\n"+msg+"\n\n<@&1018803719250382898>"); //envoie ce message dans le channel "lp"
                console.log("Une vidéo LP a été publié à "+ now.getHours()+":"+now.getMinutes()+", le " + now.getDay()+"/"+now.getMonth()+"/"+now.getFullYear());
            }
        }
        else {
            msg = message.content;
            bot.channels.cache.get('748247106980020236').send("<:YouTube:748225835269488751>__**NOUVELLE VIDÉO**__<:YouTube:748225835269488751>\n\n"+msg+"\n\n@everyone");
            skipVideo = true;
            console.log("Une vrai vidéo sur la chaine secondaire a été publié à "+ now.getHours()+":"+now.getMinutes()+", le " + now.getDay()+"/"+now.getMonth()+"/"+now.getFullYear()+" et la variable skipVideo = "+skipVideo);
        }
        
    }

    else if (message.channelId == '1023556073757618236'){ //Channel #tiktok
        msg = message.content;
        bot.channels.cache.get('892842982112374804').send("<:TikTok:828529933591904296>  __**NOUVEAU TIKTOK**__\n\n"+msg+"\n\n<@&748220128235094017>"); //envoie ce message dans le channel "stream"
        console.log("Une vrai vidéo sur la chaine secondaire a été publié à "+ now.getHours()+":"+now.getMinutes()+", le " + now.getDay()+"/"+now.getMonth()+"/"+now.getFullYear());
    }
})

require('./src/Structure//Handler/Event')(bot);
require('./src/Structure//Handler/Command')(bot);

bot.login(config.clients.token);