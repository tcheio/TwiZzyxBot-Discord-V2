const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');
const { cp, stat } = require('fs');
const config = require('./config');
const { channel } = require('diagnostics_channel');

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
NoneVideo = true;
shorts = true;
skipLive = true;
AllLive = true;


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
        
        for (i = 0; i < msg.length; i++){
            if (msgBis[i] == "#shorts"){
                return true;
            }
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

    function emoteTitre(titre){
        if (titre == " NARUTO UHC "){
            return "🍥"+titre;
        }
        
        else if (titre == " LG UHC "){
            return "🐺"+titre;
        }

        else if (titre == " SKY DEFENDER "){
            return "🏰"+titre;
        }

        
        else if (titre == " DEMON SLAYER UHC "){
            return "👺"+titre;
        }
        

        else if (titre == " KLK UHC " || titre == " KLK UHC V2 "){
            return "✂️"+titre;

        }

        else if (titre == " MARATHON KLK UHC "){
            return "✂️"+titre;
        }
        
        else if (titre == " SHERLOCK UHC "){
            return "🔎"+titre;
        }

        else if (titre == " ONE PIECE UHC "){
            return "🏴‍☠️"+titre;
        }
        
        else if (titre == " THE BOYS UHC "){
            return "💥"+titre;
        }
        
        else if (titre == " FMA UHC "){
            return "🧪"+titre;
        }
        
        else if (titre == " ATTACK ON TITAN UHC " || titre == " AOT UHC "){
            return "⚔️"+titre;
        }

        else if (titre == " DEATH NOTE UHC "){
            return "☠️"+titre;
        }

        else if (titre == " EIGHTY SIX UHC "){
            return "🃏"+titre;
        }

        else if (titre == " JJK UHC "){
            return "👹"+titre;
        }

        else if (titre == " FDP UHC "  || titre == " DAWA UHC "){
            return "🤡"+titre;
        }

        else if (titre == " MADOKA UHC "){
            return "🪄"+titre;
        }
        
        else if (titreBis[1] == "SURVIE"  || titre == " 🪓SURVIE HARDCORE "){
            return "🪓"+titre;
        }

        else if (titre == " FAST BAND UHC "){
            return "🟡"+titre;
        }

        else if(titre == " BLEACH UHC "){
            return "👹"+titre;
        }

        else {
            return titre;
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
            if (msgBis[i] == ")" && msgBis[i+1] == "|"){
                statut = false;
            }
            i++;
        }
        for (j = i+1; j<msgBis.length; j++) {
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

    function chercheMinia(titre,jeu){
        //console.log(titre);
        //MC
        lg = ["https://media.discordapp.net/attachments/1101573944538042458/1101574376220004512/LG_UHC_-_Grand_Mechant_Loup.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573944538042458/1101574348550193292/LG_UHC_-_PERFIDE_2.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573944538042458/1101574300286337185/LG_UHC_-_ERMITE_ZIZANIE.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573944538042458/1101574256220962876/LG_UHC_-_IPDL.png?width=1193&height=671"];
        naruto = ["https://media.discordapp.net/attachments/1101574073231872070/1146049588072042566/Twix_ino_1.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574073231872070/1101575468395794522/Naruto_UHC_-Konan.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574073231872070/1101575450284785804/Naruto_UHC_-Sasuke.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574073231872070/1101575384853655704/Naruto_UHC.jpg?width=1193&height=671"];
        klk = ["https://media.discordapp.net/attachments/1101573990193053736/1155057236478017587/Twix_KLK_kiznaiver1.png?width=829&height=466","https://media.discordapp.net/attachments/1101573990193053736/1101574916337311825/KLK_UHC_-_Jujutsusare.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573990193053736/1104378814299132025/Twix_Ragyo.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573990193053736/1127895984240857099/Twix_Satsuki.png?width=1193&height=671"];
        ds = ["https://media.discordapp.net/attachments/1101573959666905150/1132968955095560202/Twix_Zenitsu.png?width=1177&height=662","https://media.discordapp.net/attachments/1101573959666905150/1101574749634695268/maxresdefault.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573959666905150/1101574478338736239/DS_UHC_-_Nezuko_by_SISSOU.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573959666905150/1101574460013813801/DS_UHC_-_Tomioka.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573959666905150/1101574436651544576/DS_UHC_-_NAKIME_by_SISSOU.png?width=1193&height=671"];
        sh = ["https://media.discordapp.net/attachments/751141465912246422/1150076121023512576/Twix_Riza.png?width=829&height=466","https://media.discordapp.net/attachments/1101574004483051590/1101574983458766908/Twix_Boom.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574004483051590/1101574971786002562/Sherlock_UHC_-_Lestrade_Manipule.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574004483051590/1101574959492501645/Sherlock_UHC_-_James_Moriarty.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574004483051590/1114498223923544155/Twix_Journaliste_Sherlock.png?width=1193&height=671"];
        op = ["https://media.discordapp.net/attachments/1101574086083231814/1101575522565234869/OP_UHC_-_Marco_by_SISSOU.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574086083231814/1101575508916973718/OP_UHC_-_Sengoku.png?width=1193&height=671"];
        tb = ["https://media.discordapp.net/attachments/1101574172838199400/1101575734033645709/THE_BOYS_UHC_-_VOUGHT.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574172838199400/1101575747333791824/TB_UHC_-_Vought_2.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574172838199400/1101575809145262150/Twix_minia.png?width=1193&height=671"];
        skydef = "https://media.discordapp.net/attachments/1064668600285282315/1067859958227542096/GIF_SKY_DEF.gif";
        aot = ["https://media.discordapp.net/attachments/1101573974569271468/1119725029635133440/Twix_AOT_machoire.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573974569271468/1101574857549942784/Twix_AOT_finit-1.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573974569271468/1101574846854471760/AOT_UHC_-_EREN_FLOP.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573974569271468/1101574836431634472/AOT_UHC_-_KORD.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573974569271468/1101574825471918140/AOT_UHC_-_KEITH_SHADIS.png?width=1193&height=671"];
        fma = ["https://media.discordapp.net/attachments/1101574158753726564/1101575662424309870/FMA_UHC_-_FATHER.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574158753726564/1117798274418626580/Twix_Kimblee-min.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574158753726564/1101575637774385152/FMA_UHC_-_VAN.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574158753726564/1129659317344272394/Twix_Tank.png?width=1177&height=662"];
        es = "https://media.discordapp.net/attachments/1137294777294008341/1137294821917200404/Twix_86_1.png?width=1061&height=597"; 
        dn = ["https://media.discordapp.net/attachments/1101574026582839437/1101575226447372389/DEATH_NOTE_-_TRIO_DE_ZINZIN.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574026582839437/1101575226447372389/DEATH_NOTE_-_TRIO_DE_ZINZIN.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574026582839437/1116825506726281257/maxresdefault.png?width=1193&height=671"];
        jjk = "https://media.discordapp.net/attachments/1155056320752394240/1155056344139833394/JJK_UHC_-_Nobara_by_Sissou.png?width=829&height=466";
        dawa = ["https://media.discordapp.net/attachments/1064668600285282315/1124759438188888064/cf45b92782ab0c90d2e29bb27961f0a4.gif","https://media.discordapp.net/attachments/1064668600285282315/1124759438583144508/AA0k.gif"];
        madoka = ["https://media.discordapp.net/attachments/1155055914194317332/1155055971236847626/Twix_Madoka1_1.png?width=829&height=466","https://media.discordapp.net/attachments/1155055914194317332/1155056243627536394/Twix_Sayaka.png?width=829&height=466"];
        fb = "https://media.discordapp.net/attachments/1155056404583956531/1155056424653705216/Twix_FB1_1.png?width=829&height=466";
        bleach = "https://cdn.discordapp.com/attachments/1155056476432384000/1155056609031110697/maxresdefault.png";
        survie = ["https://media.discordapp.net/attachments/1120085675463692349/1127896274222448670/Hardcore_E1.png?width=1177&height=662s"];

        //AUTRES
        mc = "https://images-ext-2.discordapp.net/external/5EgjXqovZZbX-J2JzsThelYNqjfXGnurl3FhTd9_AZw/https/i.ibb.co/Hpfvh2b/GIF-MC.gif";
        among = "https://media.discordapp.net/attachments/1064668600285282315/1066800722861109349/Among_us.gif";
        IE = "https://media.discordapp.net/attachments/1064668600285282315/1066800631274283089/IE.gif";
        mardi = ["https://media.discordapp.net/attachments/1064668600285282315/1064679234506858558/MARDI_ZIZI_LOGO_1.gif","https://media.discordapp.net/attachments/1064668600285282315/1064815378431213588/MARDI_ZIZI_LOGO_2.gif"];
        pokemon = "https://images-ext-2.discordapp.net/external/horKKxFAj8ZRHeDJS8Xcx0N0ngEIMKJPpU0TqgOE4kQ/https/i.ibb.co/vx7mPX7/GIF-POKEMON.gif";
        lyoko = "https://images-ext-2.discordapp.net/external/Y8Q6iyEymL5dCdN-QQrAWjbq_xQE6EUD1acDe8OiiXY/https/i.ibb.co/TrDkV4D/GIF-CODE-LYOKO.gif";
        batman = "https://media.discordapp.net/attachments/1064668600285282315/1097593503468503080/GIF_BATMA.gif";
        mk = "https://cdn.discordapp.com/attachments/1064668600285282315/1117801112490233926/GIF_MK_WII.gif";
        direct = "https://media.discordapp.net/attachments/1120085675463692349/1127896907138748517/direct.png?width=1193&height=671";
        autre = ["https://cdn.discordapp.com/attachments/748245620409761932/1167425216205557770/BYE.gif?ex=654e1475&is=653b9f75&hm=e812b225ad0bc06eb63577149c398554b696ef469d1064d16b9e33d6393ecb92&","https://cdn.discordapp.com/attachments/1064668600285282315/1064668676768415744/demJfjp.gif.gif"];
        MKLK = "https://media.discordapp.net/attachments/1064668600285282315/1136943663415558244/GIF_KLK_-_Imgur.gif?width=862&height=485";
        wiiSport = "https://media.discordapp.net/attachments/1064668600285282315/1138880259475910726/Wii_sport.gif?width=862&height=485";
        //Mettre le bon gif
        ygo = "https://cdn.discordapp.com/attachments/748480743793229845/1138892862369579049/image.png?ex=654bcb21&is=65395621&hm=104097289e2570e28768f74d1638c2ad5aa6baeac5f5a2c6a20519845f199f9a&";
        titreBis = titre.split(" ");

        if (jeu == "Minecraft"){                
            for (i = 0; i < tabAllStream.length; i++){
                    if (titre == " NARUTO UHC "){
                        random = Math.floor(Math.random() * (naruto.length));
                        return naruto[random];
                    }
                    
                    else if (titre == " LG UHC "){
                        random = Math.floor(Math.random() * (lg.length));
                        return lg[random];
                    }

                    else if (titre == " SKY DEFENDER "){
                        return skydef;
                    }

                    
                    else if (titre == " DEMON SLAYER UHC "){
                        random = Math.floor(Math.random() * (ds.length));
                        return ds[random];
                    }
                    

                    else if (titre == " KLK UHC " || titre == " KLK UHC V2 "){
                        random = Math.floor(Math.random() * (klk.length));
                        return klk[random];

                    }

                    else if (titre == " MARATHON KLK UHC "){
                        return MKLK;
                    }
                    
                    else if (titre == " SHERLOCK UHC "){
                        random = Math.floor(Math.random() * (sh.length));
                        return sh[random];
                    }

                    else if (titre == " 🏴ONE PIECE UHC "){
                        random = Math.floor(Math.random() * (op.length));
                        return op[random];
                    }
                    
                    else if (titre == " THE BOYS UHC "){
                        random = Math.floor(Math.random() * (tb.length));
                        return tb[random];
                    }
                    
                    else if (titre == " FMA UHC "){
                        random = Math.floor(Math.random() * (fma.length));
                        return fma[random];
                    }
                    
                    else if (titre == " ATTACK ON TITAN UHC " || titre == " AOT UHC "){
                        random = Math.floor(Math.random() * (aot.length));
                        return aot[random];
                    }

                    else if (titre == " DEATH NOTE UHC "){
                        random = Math.floor(Math.random() * (dn.length));
                        return dn[random];
                    }

                    else if (titre == " EIGHTY SIX UHC "){
                        return es;
                    }

                    else if (titre == " JJK UHC "){
                        return jjk;
                    }

                    else if (titre == " FDP UHC "  || titre == " DAWA UHC "){
                        random = Math.floor(Math.random() * (dawa.length));
                        return dawa[random];
                    }

                    else if (titre == " MADOKA UHC "){
                        random = Math.floor(Math.random() * (madoka.length));
                        return madoka[random];
                    }
                    
                    else if (titreBis[1] == " SURVIE "  || titre == " SURVIE HARDCORE "){
                        random = Math.floor(Math.random() * (survie.length));
                        return survie[random];
                    }

                    else if (titre == " FAST BAND UHC "){
                        return fb;
                    }

                    else if(titre == " BLEACH UHC "){
                        return bleach;
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

                else if (jeubis[0] == "WII" || jeubis[1] == "Sports"){
                    return wiiSport;
                }

                else if (jeubis[0] == "Batman:"){
                    return batman;
                }
                
                else if (jeubis[0] == "Batman:"){
                    return batman;
                }
                
                else if (jeubis[0] == "Mario" && jeubis[1] == "Kart"){
                    return mk;
                }

                else if (jeubis[0] == "Inazuma" && jeubis[1] == "Eleven"){
                    return IE;
                }
                
                else if (jeubis[0] == "Among" && jeubis[1] == "Us"){
                    return among;
                }

                else if(jeubis[0] == "Yu-Gi-Oh!"){
                    return ygo;
                    console.log(ygo);
                }

                else if (jeu == "IFSCL") {
                    return lyoko;
                }

                else {

                titreBis = titre.split(" ");
                console.log(titreBis[0]+titreBis[1]);
                if (titreBis[0] == "CODE" && titreBis[1] == "LYOKO"){
                    return lyoko;
                }

                else if (titre == " MARDI Z*ZI " || titre == " MARDI Z\*ZI "){
                    random = Math.floor(Math.random() * (mardi.length));
                    return mardi[random];
                }

                else if (titre == " 📺TWIZZYX DIRECT "){
                    return direct;
                }

                else if (titre == " 📹MONTAGE D'UNE VIDEO AVEC VOUS "){
                    return "https://cdn.discordapp.com/attachments/1120085675463692349/1158673971135393812/video-editing-jack-cole.gif?ex=651d1ab9&is=651bc939&hm=e07cae98b13d580fe941c56fbcda5596f0bb99f66208fca9d345393bf55e6c65&";
                }

                //Cas par defaut
                random = Math.floor(Math.random() * (autre.length));
                return autre[random];
            }
        }
        
                
    }

    //Recherche de titre et description spécial pour Event Spécial
    function titreTravail2(msg){
            statu = true;
            comp = 0
            i = 0;
            titre ="";
            msgBis = msg.split("");
            max = msgBis.length;
            //Exclure mon pseudo et les 2 symboles
            while (statu){
                if (msgBis[i] == "-"){
                    comp +=1;
                }
    
                if (comp == 2){
                    statu = false;
                }
                i++;
            }
            //Construction du titre
            titre += "🚨LIVE 24H -" //Préfixe qu'on veut ajouter devant
            for (j = i; j<msgBis.length; j++){
                if (msgBis[j] == "-"){
                    return titre;
                }
                else{
                    titre += msgBis[j];
                }
            }
        
    
    }
    function descriptionTravail2(msg){
            msgBis = msg.split("");
            desc = "";
            statut = 0;
            for (i = 0; i < msgBis.length; i++){
                    if (msgBis[i] == "-"){
                        statut +=1;
                    }
                    
                    else if(statut == 3){
                        desc += msgBis[i];
                    }
    
                    if (msgBis[i] == "|"){
                        return desc;
                    }
            }
    }
    function chercheVraiTitre(titre){
        titreT = titre.split("");
        categorie = "";
        statut = true;
        i = 0;
        for (i; i < titreT.length; i++){
            if (titreT[i] == "-"){
                statut = false;
            }

            else if (statut == false){
                categorie += titreT[i];
            }
        }
        return categorie;
    }


bot.on("messageCreate", async message => {
    if (message.channelId == config.channel.envoie){ //Channel #twitch channel retour
        mention = "<@&748220271839805520>";
        if (skipLive){
            if (AllLive == false){
                AllLive = true;
                mention = "@everyone";
            }
            msg = message.content;
            jeu = chercheJeu(msg);

            //Recherche Classique
            titre = titreTravail(msg);
            console.log(titre);
            desc = descriptionTravail(msg);
            console.log(desc);
            minia = chercheMinia(titre,jeu);

            //Recherche Event spécial
            /*titre = titreTravail2(msg);
            console.log(titre);
            desc = descriptionTravail2(msg);
            console.log(desc);
            categorie = chercheVraiTitre(titre);
            console.log(categorie);
            minia = chercheMinia(categorie,jeu);*/

                const TWITCH = new EmbedBuilder()
                    .setColor('#9B00FF')
                    .setTitle("**"+emoteTitre(titre)+"**")
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
            console.log("Un live a été publié à "+temps());
            bot.channels.cache.get(config.channel.retour).send("Un live a été publié à "+temps());
        }

        else if (skipLive == false){
            skipLive = true;
            //Message dans le général staff
            bot.channels.cache.get(config.channel.generalStaff).send("Un live aurait du être annoncé, <@209395375474212865> n'oublie pas de faire l'annonce et la variable skipLive est de nouveau en "+skipLive);
        }
        
        

    }
    else if (message.channelId == config.channel.reping){ //Channel #reping-stream
        mention = "<@&748220271839805520>";
        msg = message.content;
        jeu = chercheJeu(msg);

        //Recherche Classique
        titre = titreTravail(msg);
        console.log(titre);
        desc = descriptionTravail(msg);
        console.log(desc);
        minia = chercheMinia(titre,jeu);

        //Recherche Event spécial
        /*titre = titreTravail2(msg);
        console.log(titre);
        desc = descriptionTravail2(msg);
        categorie = chercheVraiTitre(titre);
        minia = chercheMinia(categorie,jeu);*/
                const TWITCH = new EmbedBuilder()
                    .setColor('#9B00FF')
                    .setTitle("**"+emoteTitre(titre)+"**")
                    .setDescription(desc)
                    .setURL("https://www.twitch.tv/twizzyxpassympa")
                    .setAuthor({ name: 'TwiZzyxPasSympa', iconURL: 'https://media.discordapp.net/attachments/1064189139349684244/1064189177060663326/channels4_profile.jpg?width=671&height=671', url: 'https://www.twitch.tv/twizzyxpassympa' })
                    .addFields(
                        {name: '<:Twitch:748225816973803562>TwiZzyx est toujours en stream sur Twitch', value: "Il ne s'arrête jamais ou quoi là" },
                        {name: "Joue à", value: jeu})
                    .setThumbnail("https://media.discordapp.net/attachments/1064189139349684244/1064189177060663326/channels4_profile.jpg?width=671&height=671")
                    .setImage(minia)
                    .setTimestamp()
                    .setFooter({ text: config.clients.name, iconURL: config.clients.logo});
                    bot.channels.cache.get(config.channel.stream).send({ embeds: [TWITCH] });
                    bot.channels.cache.get(config.channel.stream).send(mention).then(sentMessage => {
                        sentMessage.delete({ timeout: 4000 });
                    })
                    .catch(console.error);;

            //log serveur
            console.log("Un reping de live a été publié à "+temps());
            bot.channels.cache.get(config.channel.log).send("Un reping de live a été publié à "+temps());
    }
    else if (message.channelId == config.channel.youtube){ //Channel #clip-lp
        if (skipVideo && NoneVideo) {
            msg = message.content;
            console.log("Message: "+msg);
            bot.channels.cache.get(config.channel.lp).send("<:YouTubeBleu:1018805788090839061> __**NOUVELLE VIDEO TWIZZYX²**__ <:YouTubeBleu:1018805788090839061>\n\n"+msg+"\n\n||<@&1018803719250382898>||"); //envoie ce message dans le channel "lp"
            //log serveur
            console.log("Une vidéo sur TwiZzyx² a été publié à "+temps());
            bot.channels.cache.get(config.channel.log).send("Une vidéo sur TwiZzyx² a été publié à "+temps()); 
        }
                
        else if(skipVideo == true && NoneVideo == false){
            bot.channels.cache.get(config.channel.generalStaff).send("Une vidéo aurait du être annoncé <@209395375474212865> et la variable NoneVideo est de nouveau en "+NoneVideo); 
        }

        else {
            msg = message.content;
            bot.channels.cache.get(config.channel.videos).send("<:YouTube:748225835269488751>__**NOUVELLE VIDÉO**__<:YouTube:748225835269488751>\n\n"+msg+"\n\n||@everyone||");
            skipVideo = true;
            //log serveur
            console.log("Une vrai vidéo sur la chaine secondaire a été publié à "+temps()+" et la variable skipVideo = "+skipVideo);
            bot.channels.cache.get(config.channel.log).send("Une vrai vidéo sur la chaine secondaire a été publié à "+temps()+" et la variable skipVideo = "+skipVideo); 
        }
    }    

    else if (message.channelId == config.channel.chainePrincipal){ //Channel #videos
        msgVideo = message.content;
        statut = rechercheCaract(msgVideo);

        if (!statut){
            bot.channels.cache.get(config.channel.videos).send("<:YouTube:748225835269488751>__**NOUVELLE VIDÉO**__<:YouTube:748225835269488751>\n\n**"+msgVideo+"**\n\n||@everyone||");
            console.log("Une vidéo a été publié à "+temps());
            bot.channels.cache.get(config.channel.log).send("Une vidéo a été publié à "+temps()); 
        }

        else {
            bot.channels.cache.get(config.channel.clip).send("<:YouTube:748225835269488751>__**NOUVELLE CLIP**__<:YouTube:748225835269488751>\n\n**"+msgVideo+"**\n\n||@everyone||");
            console.log("Un clip a été publié à "+temps());
            bot.channels.cache.get(config.channel.log).send("Une vidéo a été publié à "+temps()); 
        }
        
    }

})

require('./src/Structure//Handler/Event')(bot);
require('./src/Structure//Handler/Command')(bot);


bot.login(config.clients.token);
