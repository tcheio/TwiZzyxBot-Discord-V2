const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');
const { cp, stat } = require('fs');
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
        statu = true;
        i = 0;
        titre ="";
        msgBis = msg.split("");
        max = msgBis.length;
        //Exclure mon pseudo et le symbole
        while (statu){
            if (msgBis[i] == "-"){
                statu = false;
            }
            i++;
        }
        //Construction du titre
        for (j = i; j<msgBis.length; j++){
            if (msgBis[j] == "-"){
                return titre;
            }
            else{
                titre += msgBis[j];
            }
        }
        

    }

    function descriptionTravail(msg){
        msgBis = msg.split("");
        desc = "";
        statut = 0;
        for (i = 0; i<msgBis.length; i++){
                if (msgBis[i] == "-"){
                    statut +=1;
                }
                
                else if(statut == 2 && msgBis[i] != "|"){
                    desc += msgBis[i];
                }

                if (msgBis[i] == "|"){
                    return desc;
                }
        }
    }

    function chercheJeu (msg){
        jeu ="";
        msgBis = msg.split("");
        statut = true;
        i = 0;
        while (statut){
            if (msgBis[i] == ")"){
                statut = false;
            }
            i++;
        }
        for (j = i; j<msgBis.length; j++) {
            jeu += msgBis[j]; 
        }

        return jeu;
    }

    function temps(){
        var now = new Date();
        //Traitement Minute 
        minute = now.getMinutes().toString();
        if (minute.length == 1){ minute = "0"+now.getMinutes(); }

        //Traitement Mois
        mois = parseInt((now.getUTCMonth()+1))
        mois = mois.toString();
        if (mois.length == 1){ mois = "0"+parseInt((now.getUTCMonth()+1)); console.log}

        tempsDate = (now.getHours())+":"+minute+", le " + now.getDate()+"/"+mois+"/"+now.getFullYear();

        return tempsDate;
    }

    function chercheMinia(titre){
        console.log(titre);
        mardi = ["https://media.discordapp.net/attachments/1064668600285282315/1064679234506858558/MARDI_ZIZI_LOGO_1.gif","https://media.discordapp.net/attachments/1064668600285282315/1064815378431213588/MARDI_ZIZI_LOGO_2.gif"];
        lg = ["https://media.discordapp.net/attachments/1064189056927400048/1064659083199774911/LG_UHC_-_PERFIDE_2.png?width=1193&height=671","https://media.discordapp.net/attachments/1064189056927400048/1064668057978536097/LG_UHC_-_IPDL.png?width=1193&height=671"];
        naruto = ["https://media.discordapp.net/attachments/1064189056927400048/1064189088242085968/Naruto_UHC_-Konan.png?width=1193&height=671","https://media.discordapp.net/attachments/1064189056927400048/1064668138735665273/Naruto_UHC_-Sasuke.png?width=1193&height=671"];
        klk = "https://media.discordapp.net/attachments/1064189056927400048/1064816769715413034/KLK_UHC_-_Nouveau_mode_de_jeu_maiko.png?width=1193&height=671";
        ds = ["https://media.discordapp.net/attachments/1064189056927400048/1064816706641465354/DS_UHC_-_Nezuko_by_Hasuki.png?width=1193&height=671", "https://media.discordapp.net/attachments/1064189056927400048/1064816707006378004/DS_UHC_-_Tomioka.png?width=1193&height=671"];
        sh = ["https://media.discordapp.net/attachments/1064189056927400048/1064816627385901156/Sherlock_UHC_-_James_Moriarty.png?width=1193&height=671","https://media.discordapp.net/attachments/1064189056927400048/1064816627700482078/Sherlock_UHC_-_Lestrade_Manipule.png?width=1193&height=671"];
        op = ["https://media.discordapp.net/attachments/1064189056927400048/1064816803622162442/OP_UHC_-_Sengoku.png?width=1193&height=671","https://media.discordapp.net/attachments/1064189056927400048/1064816804058386482/OP_UHC_-_Marco_by_SISSOU.png?width=1193&height=671"];
        tb = ["https://media.discordapp.net/attachments/1064189056927400048/1064816849470103603/THE_BOYS_UHC_-_VOUGHT.png?width=1193&height=671","https://media.discordapp.net/attachments/1064189056927400048/1064816849851777064/TB_UHC_-_Vought_2.png?width=1193&height=671"]
        skydef = "https://media.discordapp.net/attachments/1064668600285282315/1067859958227542096/GIF_SKY_DEF.gif";
        aot = "https://media.discordapp.net/attachments/1064189056927400048/1069695407317319771/AOT_UHC_-_KEITH_SHADIS.png?width=1193&height=671";

        among = "https://media.discordapp.net/attachments/1064668600285282315/1066800722861109349/Among_us.gif";
        IE = "https://media.discordapp.net/attachments/1064668600285282315/1066800631274283089/IE.gif";
        autre = ["https://cdn.discordapp.com/attachments/1064668600285282315/1064668676768415744/demJfjp.gif.gif","https://media.discordapp.net/attachments/1064668600285282315/1069894438379343962/gif_autre.gif"];
    
        tabAllStream = [" 🐺LG UHC "," 🍥NARUTO UHC "," 🍌MARDI Z*ZI "," 👺DEMON SLAYER UHC "," 🏰KILL LA KILL UHC "," 🔎SHERLOCK UHC "," 🏴‍☠️ONE PIECE UHC "," 💥THE BOYS UHC "," ⚽INAZUMA ELEVEN 2 : Tempête de Glace "," ⚽INAZUMA ELEVEN GO STRIKERS 2013 "," 🔎AMONG US ", " 🏰SKY DEFENDER "];
        for (i = 0; i < tabAllStream.length; i++){
            if (titre == tabAllStream[i]){
                //Différents cas habituel
                if (titre == " 🍥NARUTO UHC "){
                    random = Math.floor(Math.random() * (naruto.length));
                    return naruto[random];
                }
                
                else if (titre == " 🐺LG UHC "){
                    random = Math.floor(Math.random() * (lg.length));
                    return lg[random];
                }

                else if (titre == " 🏰SKY DEFENDER "){
                    return skydef;
                }

                else if (titre == " 🍌MARDI Z*ZI "){
                    random = Math.floor(Math.random() * (mardi.length));
                    return mardi[random];
                }

                else if (titre == " 👺DEMON SLAYER UHC "){
                    random = Math.floor(Math.random() * (ds.length));
                    return ds[random];
                }

                else if (titre == " 🏰KILL LA KILL UHC "){
                    return klk;
                }

                else if (titre == " 🔎SHERLOCK UHC "){
                    random = Math.floor(Math.random() * (sh.length));
                    return sh[random];
                }

                else if (titre == " 🏴‍☠️ONE PIECE UHC "){
                    random = Math.floor(Math.random() * (op.length));
                    return op[random];
                }

                else if (titre == " 💥THE BOYS UHC "){
                    random = Math.floor(Math.random() * (tb.length));
                    return tb[random];
                }

                else if (titre == " ⚔️ATTACK ON TITAN UHC "){
                    console.log("yo");
                    return aot;
                }

                else if (titre == " ⚽INAZUMA ELEVEN 2 : Tempête de Glace " || titre == " ⚽INAZUMA ELEVEN GO STRIKERS 2013 "){
                    return IE;
                }
                
                else if (titre == " 🔎AMONG US "){
                    return among;
                }


            }

            
        }
        //Cas par defaut
        random = Math.floor(Math.random() * (autre.length));
        return autre[random];
    }


//Message d'annonce Live/Tiktok/LP/Clips
bot.on("messageCreate", async message => {
    if (message.channelId == '1021708905744715819git'){ //Channel #twitch channel retour
        if (skipLive){
            msg = message.content;
            titre = titreTravail(msg);
            desc = descriptionTravail(msg);
            minia = chercheMinia(titre);
            jeu = chercheJeu(msg);
                const TWITCH = new EmbedBuilder()
                    .setColor('#9B00FF')
                    .setTitle("**"+titre+"**")
                    .setDescription(desc)
                    .setURL("https://www.twitch.tv/twizzyxpassympa")
                    .setAuthor({ name: 'TwiZzyxPasSympa', iconURL: 'https://media.discordapp.net/attachments/1064189139349684244/1064189177060663326/channels4_profile.jpg?width=671&height=671', url: 'https://www.twitch.tv/twizzyxpassympa' })
                    .addFields(
                        {name: 'TwiZzyx est en stream sur Twitch', value: "C'est zinzin" },
                        {name: "Joue à", value: jeu})
                    .setThumbnail("https://media.discordapp.net/attachments/1064189139349684244/1064189177060663326/channels4_profile.jpg?width=671&height=671")
                    .setImage(minia)
                    .setTimestamp()
                    .setFooter({ text: config.clients.name, iconURL: config.clients.logo});
                bot.channels.cache.get("748855744274890772").send({ embeds: [TWITCH] });
                bot.channels.cache.get("748855744274890772").send("<@&748220271839805520>")
                .then(sentMessage => {
                    sentMessage.delete({ timeout: 1000 });
                })
                .catch(console.error);;

            //log serveur
            console.log("Un live a été publié à "+temps());
            //bot.channels.cache.get('1060946019333976204').send("Un live a été publié à "+temps());
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
                bot.channels.cache.get('1014439891297386516').send("<:YouTube:748225835269488751> __**NOUVEAU CLIPS**__\n\n"+msg+"\n\n||<@&1014452932713922610>||"); //envoie ce message dans le channel "clip"
                //log serveur
                console.log("Un clip a été publié à "+temps());
                bot.channels.cache.get('1060946019333976204').send("Un clip a été publié à "+temps()); 
            }

            else {
                bot.channels.cache.get('1023891712403312720').send("<:YouTubeBleu:1018805788090839061> __**NOUVELLE VIDEO LET'S PLAY**__ <:YouTubeBleu:1018805788090839061>\n\n"+msg+"\n\n||<@&1018803719250382898>||"); //envoie ce message dans le channel "lp"
                //log serveur
                console.log("Une vidéo LP a été publié à "+temps());
                bot.channels.cache.get('1060946019333976204').send("Une vidéo LP a été publié à "+temps()); 
            }
        }

        else {
            msg = message.content;
            bot.channels.cache.get('748247106980020236').send("<:YouTube:748225835269488751>__**NOUVELLE VIDÉO**__<:YouTube:748225835269488751>\n\n"+msg+"\n\n||@everyone||");
            skipVideo = true;
            //log serveur
            console.log("Une vrai vidéo sur la chaine secondaire a été publié à "+temps()+" et la variable skipVideo = "+skipVideo);
            bot.channels.cache.get('1060946019333976204').send("Une vrai vidéo sur la chaine secondaire a été publié à "+temps()+" et la variable skipVideo = "+skipVideo); 
        }
        
    }

    else if (message.channelId == '1023556073757618236'){ //Channel #tiktok
        msg = message.content;
        bot.channels.cache.get('892842982112374804').send("<:TikTok:828529933591904296>  __**NOUVEAU TIKTOK**__\n\n"+msg+"\n\n||<@&748220128235094017>||"); //envoie ce message dans le channel "stream"
        //log serveur
        console.log("Un Tiktok a été publié à "+temps());
        bot.channels.cache.get('1060946019333976204').send("Un Tiktok a été publié à "+temps()); //CHANNEL log
    }
})

require('./src/Structure//Handler/Event')(bot);
require('./src/Structure//Handler/Command')(bot);


bot.login(config.clients.token);