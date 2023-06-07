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
planning = "https://media.discordapp.net/attachments/1064189056927400048/1079745624628527215/planningPasDispo.png?width=1193&height=671";
changement = "Pour le moment aucun";


    function maxIntent(tab){
        max = 0;
        for (i=0; i<tab.length;i++){
            if (tab[i] > max){
                max = i+1;
            }
        }
        return max;
    }
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

        tempsDate = (now.getHours()-1)+":"+minute+", le " + now.getDate()+"/"+mois+"/"+now.getFullYear();

        return tempsDate;
    }

    function chercheMinia(titre,jeu){
        console.log(titre);
        //UHC
        lg = ["https://media.discordapp.net/attachments/1101573944538042458/1101574376220004512/LG_UHC_-_Grand_Mechant_Loup.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573944538042458/1101574348550193292/LG_UHC_-_PERFIDE_2.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573944538042458/1101574300286337185/LG_UHC_-_ERMITE_ZIZANIE.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573944538042458/1101574256220962876/LG_UHC_-_IPDL.png?width=1193&height=671"];
        naruto = ["https://media.discordapp.net/attachments/1101573990193053736/1104378814299132025/Twix_Ragyo.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574073231872070/1101575468395794522/Naruto_UHC_-Konan.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574073231872070/1101575450284785804/Naruto_UHC_-Sasuke.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574073231872070/1101575384853655704/Naruto_UHC.jpg?width=1193&height=671"];
        klk = ["https://media.discordapp.net/attachments/1101573990193053736/1101574904022847508/KLK_UHC_-_Nouveau_mode_de_jeu_maiko.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573990193053736/1101574916337311825/KLK_UHC_-_Jujutsusare.png?width=1193&height=671",""];
        ds = ["https://media.discordapp.net/attachments/1101573959666905150/1101574749634695268/maxresdefault.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573959666905150/1101574478338736239/DS_UHC_-_Nezuko_by_SISSOU.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573959666905150/1101574460013813801/DS_UHC_-_Tomioka.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573959666905150/1101574436651544576/DS_UHC_-_NAKIME_by_SISSOU.png?width=1193&height=671"];
        sh = ["https://media.discordapp.net/attachments/1101574004483051590/1101574983458766908/Twix_Boom.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574004483051590/1101574971786002562/Sherlock_UHC_-_Lestrade_Manipule.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574004483051590/1101574959492501645/Sherlock_UHC_-_James_Moriarty.png?width=1193&height=671"];
        op = ["https://media.discordapp.net/attachments/1101574086083231814/1101575522565234869/OP_UHC_-_Marco_by_SISSOU.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574086083231814/1101575508916973718/OP_UHC_-_Sengoku.png?width=1193&height=671"];
        tb = ["https://media.discordapp.net/attachments/1101574172838199400/1101575734033645709/THE_BOYS_UHC_-_VOUGHT.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574172838199400/1101575747333791824/TB_UHC_-_Vought_2.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574172838199400/1101575809145262150/Twix_minia.png?width=1193&height=671"];
        skydef = "https://media.discordapp.net/attachments/1064668600285282315/1067859958227542096/GIF_SKY_DEF.gif";
        aot = ["https://media.discordapp.net/attachments/1101573974569271468/1101574857549942784/Twix_AOT_finit-1.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573974569271468/1101574846854471760/AOT_UHC_-_EREN_FLOP.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573974569271468/1101574836431634472/AOT_UHC_-_KORD.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573974569271468/1101574825471918140/AOT_UHC_-_KEITH_SHADIS.png?width=1193&height=671"];
        fma = ["https://media.discordapp.net/attachments/1101574158753726564/1101575662424309870/FMA_UHC_-_FATHER.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574158753726564/1101575652139868241/FMA_UHC_-_Kimblee.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574158753726564/1101575637774385152/FMA_UHC_-_VAN.png?width=1193&height=671"];
        es = "https://media.discordapp.net/attachments/1064189056927400048/1077866858834821120/maxresdefault.png?width=1193&height=671"; 
        dn = ["https://media.discordapp.net/attachments/1101574026582839437/1101575226447372389/DEATH_NOTE_-_TRIO_DE_ZINZIN.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574026582839437/1101575226447372389/DEATH_NOTE_-_TRIO_DE_ZINZIN.png?width=1193&height=671"];

        //AUTRES
        mc = "https://images-ext-2.discordapp.net/external/5EgjXqovZZbX-J2JzsThelYNqjfXGnurl3FhTd9_AZw/https/i.ibb.co/Hpfvh2b/GIF-MC.gif";
        among = "https://media.discordapp.net/attachments/1064668600285282315/1066800722861109349/Among_us.gif";
        IE = "https://media.discordapp.net/attachments/1064668600285282315/1066800631274283089/IE.gif";
        mardi = ["https://media.discordapp.net/attachments/1064668600285282315/1064679234506858558/MARDI_ZIZI_LOGO_1.gif","https://media.discordapp.net/attachments/1064668600285282315/1064815378431213588/MARDI_ZIZI_LOGO_2.gif"];
        pokemon = "https://images-ext-2.discordapp.net/external/horKKxFAj8ZRHeDJS8Xcx0N0ngEIMKJPpU0TqgOE4kQ/https/i.ibb.co/vx7mPX7/GIF-POKEMON.gif";
        lyoko = "https://images-ext-2.discordapp.net/external/Y8Q6iyEymL5dCdN-QQrAWjbq_xQE6EUD1acDe8OiiXY/https/i.ibb.co/TrDkV4D/GIF-CODE-LYOKO.gif";
        batman = "https://media.discordapp.net/attachments/1064668600285282315/1097593503468503080/GIF_BATMA.gif";
        autre = ["https://cdn.discordapp.com/attachments/1064668600285282315/1064668676768415744/demJfjp.gif.gif"];
        
        if (jeu == "Minecraft"){                
            for (i = 0; i < tabAllStream.length; i++){
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

                    
                    else if (titre == " 👺DEMON SLAYER UHC "){
                        random = Math.floor(Math.random() * (ds.length));
                        return ds[random];
                    }
                    
                    else if (titre == " ✂️KLK UHC " || titre == " ✂️KLK UHC V2 "){
                        random = Math.floor(Math.random() * (klk.length));
                        return klk[random];
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
                    
                    else if (titre == " 🧪FMA UHC "){
                        random = Math.floor(Math.random() * (fma.length));
                        return fma[random];
                    }
                    
                    else if (titre == " ⚔️ATTACK ON TITAN UHC "){
                        random = Math.floor(Math.random() * (aot.length));
                        return aot[random];
                    }

                    else if (titre == " ☠️DEATH NOTE UHC "){
                        random = Math.floor(Math.random() * (dn.length));
                        return dn[random];
                    }

                    else if (titre == " 🃏EIGHTY SIX UHC "){
                        return es;
                    }
                    
                    else {
                        return mc;
                    }
                }
            }

            else {
                jeubis = jeu.split(" ");
                if (jeubis[0] == "Pokémon"){
                    return pokemon;
                }

                else if (jeubis[0] == "Batman:"){
                    return batman;
                }
                
                else {
                    if (titre == " ⚽INAZUMA ELEVEN 3: Les Ogres attaquent " || titre == " ⚽INAZUMA ELEVEN GO STRIKERS 2013 "){
                    return IE;
                }
                
                else if (titre == " 🖥️CODE LYOKO TIME ") {
                    return lyoko;
                }
                else if (titre == " 🔎AMONG US "){
                    return among;
                }
                else if (titre == " 🍌MARDI Z*ZI " || titre == " MARDI Z\*ZI "){
                    random = Math.floor(Math.random() * (mardi.length));
                    return mardi[random];
                }

                else if (titre == " 🦇Batman Arkham Asylum "){
                    return batman;
                }
                //Cas par defaut
                random = Math.floor(Math.random() * (autre.length));
                return autre[random];
            }
        }
        
                
    }



//Message d'annonce Live/Tiktok/LP/Clips
bot.on("messageCreate", async message => {
    if (message.channelId == '1096735287561965568'){ //Channel #twitch channel retour
        if (skipLive){
            msg = message.content;
            titre = titreTravail(msg);
            jeu = chercheJeu(msg);
            desc = descriptionTravail(msg);
            minia = chercheMinia(titre,jeu);
                const TWITCH = new EmbedBuilder()
                    .setColor('#9B00FF')
                    .setTitle("**"+titre+"**")
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
                bot.channels.cache.get("1096735321456136222").send({ embeds: [TWITCH] });
                bot.channels.cache.get("1096735321456136222").send("<@&748220271839805520>")
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
            bot.channels.cache.get('1060946019333976204').send("Un live aurait du être annoncé, <@209395375474212865> n'oublie pas de faire l'annonce et la variable skipLive est de nouveau en "+skipLive);
        }
        
    }

    else if (message.channelId == '1104368803523072010'){ //Channel #tiktok
        msg = message.content;
        bot.channels.cache.get('1033326900564738048').send(msg); //envoie ce message dans le channel "video"
        //log serveur
        console.log("Une vidéo a été publié à "+temps());
        bot.channels.cache.get('1060978198927654933').send("Une vidéo a été publié à "+temps()); //CHANNEL log
    }

    else if (message.channelId == '1061410003300397066'){ //Channel #clip-lp
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

    else if (message.channelId == '1104368803523072010'){ //Channel #videos
        bot.channels.cache.get('1033326900564738048').send("<:YouTube:748225835269488751>__**NOUVELLE VIDÉO**__<:YouTube:748225835269488751>\n\n"+msg+"\n\n||@everyone||");
        console.log("Une vidéo a été publié à "+temps());
        bot.channels.cache.get('1060946019333976204').send("Une vidéo a été publié à "+temps()); 
    }

    else if (message.channelId == '1079743531603730472'){ //Channel #tiktok
        msg = message.content;
        bot.channels.cache.get('892842982112374804').send("<:TikTok:828529933591904296>  __**NOUVEAU TIKTOK**__\n\n"+msg+"\n\n||<@&748220128235094017>||"); //envoie ce message dans le channel "stream"
        //log serveur
        console.log("Un Tiktok a été publié à "+temps());
        bot.channels.cache.get('1060946019333976204').send("Un Tiktok a été publié à "+temps()); //CHANNEL log
    }

    else if (message.channelId == "1061410762628808734"){ //Application du nouveau Planning
        planning = message.content;
        console.log("Vous avez mis à jour le planning pour la commande /planning")
        bot.channels.cache.get('1060946019333976204').send("Vous avez mis à jour le planning pour la commande /planning à "+temps());
    }

    else if (message.channelId == "1079897267470868651"){
        changement = message.content;
        console.log("Un changement de programme a eu lieu: "+changement)
        bot.channels.cache.get('1060946019333976204').send("Un changement de programme a eu lieu: "+changement+temps());
    }

    //Detection des intensions Demo
    else if (message.channelId == "1096091134939377865"){
        intention = [0,0,0,0];
        dicoFeur = ["quoi","kwa","koi"];
        dicoQuestion = ["comment","pourquoi","qui"];
        dicoAide = ["besoin","aide","help"];
        dicoJeu = ["jeu",'jouer','game'];
        if(message.author.bot) return;

        else{
            charg = message.content;
            msg = charg.split(" ");
            console.log(msg.length);
            for (i = 0; i < msg.length; i++){
                for(j = 0; j < dicoFeur.length; j++){
                    if(msg[i] == dicoFeur[j]){
                        intention[0] += 1;
                    }
                    else if(msg[i] == dicoQuestion[j]){
                        intention[1] += 1;
                    }
                    else if(msg[i] == dicoAide[j]){
                        intention[2] += 1;
                    }
                    else if(msg[i] == dicoJeu[j]){
                        intention[3] += 1;
                    }
            }
        }
        rep = maxIntent(intention);

        switch (rep) {
            case 1:
                message.reply("https://images-ext-1.discordapp.net/external/gv_ngfsYJ0zk_r0QKZaioOodUKrxc6xDMsVyeODB8tg/https/media.tenor.com/zvg8w0FkecYAAAPo/feur-theobabac.mp4");
                break;
            case 2:
                message.reply("T'a l'air choqué, calme toi frère.");
                break;
            case 3:
                message.reply("Je suis à ton service pour t'aider.");
                break;
            case 4:
                message.reply("J'aimerai jouer avec toi mais j'ai pas de mains");
                break;
            default:
        
    }
}
}
})

require('./src/Structure//Handler/Event')(bot);
require('./src/Structure//Handler/Command')(bot);


bot.login(config.clients.token);