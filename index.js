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
    stat = true;
    i = 0;
    titre ="__**";
    msgBis = msg.split("");
    max = msgBis.length;
    //Exclure mon pseudo et le symbole
    while (stat){
        if (msgBis[i] == "-"){
            stat = false;
        }
        i++;
    }
    //Construction du titre
    for (j = i; j<msgBis.length; j++){
        if (msgBis[j] == "-"){
            titre+="**__\n*";
            if (msgBis[j+1] == " "){
                j +=1;
            }
        }
        else if (msgBis[j] == " "){
            if (msgBis[j+1] == '|'){
                titre+="*";
                return titre;
            }
            else {
                titre += msgBis[j];
            }
        }

        else{
            titre += msgBis[j];
        }
    }
    return titre;

}


//Message d'annonce Live/Tiktok/LP/Clips
bot.on("messageCreate", async message => {
    var now = new Date();
    if (message.channelId == '1021708905744715819'){ //Channel #twitch channel retour
        if (skipLive){
            msg = message.content;
            tabAnnonce = ["**LES GARS, ON PART POUR UN STREAM DE FOLIE**","**T'a rien à faire alors vient me voir en stream**","**T'es obligé de venir donc tu viens stp**","**Ecoute mon gars, je suis un petit streameur et j'ai besoin de toi**"];
            random = Math.floor(Math.random() * (tabAnnonce.length));
            titre = titreTravail(msg);
            bot.channels.cache.get('748855744274890772').send("<:Twitch:748225816973803562>"+tabAnnonce[random]+"\n\n"+titre+"\n\nhttps://www.twitch.tv/twizzyxpassympa\n\n<@&748220271839805520>"); //envoie ce message dans le channel "stream"
            //log serveur
            console.log("Un live a été publié à "+ now.getHours()+":"+now.getMinutes()+", le " + now.getHours()+":"+now.getMinutes()+", le " + now.getDate()+"/"+(parseInt(now.getUTCMonth())+1)+"/"+now.getFullYear());
            bot.channels.cache.get('1060946019333976204').send("Un live a été publié à "+ now.getHours()+":"+now.getMinutes()+", le " + now.getDate()+"/"+(parseInt(now.getUTCMonth())+1)+"/"+now.getFullYear());
        }

        else {
            skipLive = true;
            //Message dans le général staff
            bot.channels.cache.get('749975416944721940').send("Un live aurait du être annoncé, <@209395375474212865> n'oublie pas de faire l'annonce et la variable skipLive est de nouveau en "+skipLive);
        }
        
    }

    else if (message.channelId == '1022426108014100500'){ //Channel #clip-lp
        if (skipVideo) {
            msg = message.content;
            console.log("Message: "+msg);
            statut = rechercheCaract(msg);
            if (statut){
                bot.channels.cache.get('892842982112374804').send("<:YouTube:748225835269488751> __**NOUVEAU CLIPS**__\n\n"+msg+"\n\n<@&1014452932713922610>"); //envoie ce message dans le channel "clip"
                //log serveur
                console.log("Un clip a été publié à "+ now.getHours()+":"+now.getMinutes()+", le " + now.getDate()+"/"+(parseInt(now.getUTCMonth())+1)+"/"+now.getFullYear());
                bot.channels.cache.get('1060946019333976204').send("Un clip a été publié à "+ now.getHours()+":"+now.getMinutes()+", le " + now.getDate()+"/"+(parseInt(now.getUTCMonth())+1)+"/"+now.getFullYear()); 
            }

            else {
                bot.channels.cache.get('1023891712403312720').send("<:YouTubeBleu:1018805788090839061> __**NOUVELLE VIDEO LET'S PLAY**__ <:YouTubeBleu:1018805788090839061>\n\n"+msg+"\n\n<@&1018803719250382898>"); //envoie ce message dans le channel "lp"
                //log serveur
                console.log("Une vidéo LP a été publié à "+ now.getHours()+":"+now.getMinutes()+", le " + now.getDate()+"/"+(parseInt(now.getUTCMonth())+1)+"/"+now.getFullYear());
                bot.channels.cache.get('1060946019333976204').send("Une vidéo LP a été publié à "+ now.getHours()+":"+now.getMinutes()+", le " + now.getDate()+"/"+(parseInt(now.getUTCMonth())+1)+"/"+now.getFullYear()); 
            }
        }

        else {
            msg = message.content;
            bot.channels.cache.get('748247106980020236').send("<:YouTube:748225835269488751>__**NOUVELLE VIDÉO**__<:YouTube:748225835269488751>\n\n"+msg+"\n\n@everyone");
            skipVideo = true;
            //log serveur
            console.log("Une vrai vidéo sur la chaine secondaire a été publié à "+ now.getHours()+":"+now.getMinutes()+", le " + now.getDate()+"/"+(parseInt(now.getUTCMonth())+1)+"/"+now.getFullYear()+" et la variable skipVideo = "+skipVideo);
            bot.channels.cache.get('1060946019333976204').send("Une vrai vidéo sur la chaine secondaire a été publié à "+ now.getHours()+":"+now.getMinutes()+", le " + now.getDate()+"/"+(parseInt(now.getUTCMonth())+1)+"/"+now.getFullYear()); 
        }
        
    }

    else if (message.channelId == '1023556073757618236'){ //Channel #tiktok
        msg = message.content;
        bot.channels.cache.get('892842982112374804').send("<:TikTok:828529933591904296>  __**NOUVEAU TIKTOK**__\n\n"+msg+"\n\n<@&748220128235094017>"); //envoie ce message dans le channel "stream"
        //log serveur
        console.log("Un Tiktok a été publié à "+ now.getHours()+":"+now.getMinutes()+", le " + now.getDate()+"/"+(parseInt(now.getUTCMonth())+1)+"/"+now.getFullYear());
        bot.channels.cache.get('1060946019333976204').send("Un Tiktok a été publié à "+ now.getHours()+":"+now.getMinutes()+", le " + now.getDate()+"/"+(parseInt(now.getUTCMonth())+1)+"/"+now.getFullYear()); //CHANNEL log
    }
})

require('./src/Structure//Handler/Event')(bot);
require('./src/Structure//Handler/Command')(bot);

bot.login(config.clients.token);