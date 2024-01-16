//Construit le titre en fonction du message
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

//Récupère la description du stream en enlevant le pseudo et les commandes
function descriptionTravail(msg){
    statu = true;
    i = 0;
    desc ="";
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
            return desc;
        }
        else{
            desc += msgBis[j];
        }
    }
}

//Ajoute une emote au titre en fonction de son titre et de son jeu
function emoteTitre(titre,jeu){
        
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

    else if (titre == "INDUSTRIAL UHC "){
        return "⚙️"+titre;
    }
    
    else if (jeubis[0] == "Batman:"){
        return "🦇"+titre;
    }
    
    else if (jeubis[0] == "Mario" && jeubis[1] == "Kart"){
        return "🏎️"+titre;
    }

    else if (jeubis[0] == "Inazuma" && jeubis[1] == "Eleven"){
        return "⚽"+titre;
    }
    
    else if (jeubis[0] == "Among" && jeubis[1] == "Us"){
        return "🕵️"+among;
    }

    else if(jeubis[0] == "Yu-Gi-Oh!"){
        return "<:Yugimote:1173369665062457345>"+titre;
    }

    else if (jeubis[0] == "Marvel's" && jeubis[1] == "Spider-Man:"){
        return "🕷️"+titre;
    }

    else if (jeu == "IFSCL") {
        return lyoko;
    }

    else { 
        return titre;
    }

}

//Récupère le jeu du stream
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

//Cherche la minia en fonction du titre et du jeu
function chercheMinia(titre,jeu){
    //MC
    lg = ["https://media.discordapp.net/attachments/1101573944538042458/1101574376220004512/LG_UHC_-_Grand_Mechant_Loup.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573944538042458/1101574348550193292/LG_UHC_-_PERFIDE_2.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573944538042458/1101574300286337185/LG_UHC_-_ERMITE_ZIZANIE.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573944538042458/1101574256220962876/LG_UHC_-_IPDL.png?width=1193&height=671"];
    naruto = ["https://media.discordapp.net/attachments/1101574073231872070/1146049588072042566/Twix_ino_1.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574073231872070/1101575468395794522/Naruto_UHC_-Konan.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574073231872070/1101575450284785804/Naruto_UHC_-Sasuke.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574073231872070/1101575384853655704/Naruto_UHC.jpg?width=1193&height=671"];
    klk = ["https://media.discordapp.net/attachments/1101573990193053736/1155057236478017587/Twix_KLK_kiznaiver1.png?width=829&height=466","https://media.discordapp.net/attachments/1101573990193053736/1101574916337311825/KLK_UHC_-_Jujutsusare.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573990193053736/1104378814299132025/Twix_Ragyo.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573990193053736/1127895984240857099/Twix_Satsuki.png?width=1193&height=671"];
    ds = ["https://media.discordapp.net/attachments/1101573959666905150/1132968955095560202/Twix_Zenitsu.png?width=1177&height=662","https://media.discordapp.net/attachments/1101573959666905150/1101574749634695268/maxresdefault.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573959666905150/1101574478338736239/DS_UHC_-_Nezuko_by_SISSOU.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573959666905150/1101574460013813801/DS_UHC_-_Tomioka.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573959666905150/1101574436651544576/DS_UHC_-_NAKIME_by_SISSOU.png?width=1193&height=671"];
    sh = ["https://media.discordapp.net/attachments/1101574004483051590/1175834317394546901/Twix_ta_mere_la_pute.png?ex=656cac0b&is=655a370b&hm=c3253689a9525f2416e22b612bee630e491e1ad37aa0b8bda53c9cd92b1373c4&=&width=705&height=397","https://media.discordapp.net/attachments/1101574004483051590/1101574983458766908/Twix_Boom.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574004483051590/1101574971786002562/Sherlock_UHC_-_Lestrade_Manipule.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574004483051590/1101574959492501645/Sherlock_UHC_-_James_Moriarty.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574004483051590/1114498223923544155/Twix_Journaliste_Sherlock.png?width=1193&height=671"];
    op = ["https://media.discordapp.net/attachments/1101574086083231814/1101575522565234869/OP_UHC_-_Marco_by_SISSOU.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574086083231814/1101575508916973718/OP_UHC_-_Sengoku.png?width=1193&height=671"];
    tb = ["https://media.discordapp.net/attachments/1101574172838199400/1101575734033645709/THE_BOYS_UHC_-_VOUGHT.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574172838199400/1101575747333791824/TB_UHC_-_Vought_2.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574172838199400/1101575809145262150/Twix_minia.png?width=1193&height=671"];
    skydef = "https://media.discordapp.net/attachments/1064668600285282315/1067859958227542096/GIF_SKY_DEF.gif";
    aot = ["https://media.discordapp.net/attachments/1101573974569271468/1119725029635133440/Twix_AOT_machoire.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573974569271468/1101574857549942784/Twix_AOT_finit-1.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573974569271468/1101574846854471760/AOT_UHC_-_EREN_FLOP.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573974569271468/1101574836431634472/AOT_UHC_-_KORD.png?width=1193&height=671","https://media.discordapp.net/attachments/1101573974569271468/1101574825471918140/AOT_UHC_-_KEITH_SHADIS.png?width=1193&height=671"];
    fma = ["https://media.discordapp.net/attachments/751141465912246422/1150076121023512576/Twix_Riza.png?width=829&height=466","https://media.discordapp.net/attachments/1101574158753726564/1101575662424309870/FMA_UHC_-_FATHER.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574158753726564/1117798274418626580/Twix_Kimblee-min.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574158753726564/1101575637774385152/FMA_UHC_-_VAN.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574158753726564/1129659317344272394/Twix_Tank.png?width=1177&height=662","https://media.discordapp.net/attachments/1101574158753726564/1175834091837476885/Twix_Riza.png?ex=656cabd5&is=655a36d5&hm=c70edfe59dc6a805453d885be12601086e5f7e7a58a1e7a9e0972979d9a1b6cb&=&width=705&height=397"];
    es = "https://media.discordapp.net/attachments/1137294777294008341/1137294821917200404/Twix_86_1.png?width=1061&height=597"; 
    dn = ["https://media.discordapp.net/attachments/1101574026582839437/1101575226447372389/DEATH_NOTE_-_TRIO_DE_ZINZIN.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574026582839437/1101575226447372389/DEATH_NOTE_-_TRIO_DE_ZINZIN.png?width=1193&height=671","https://media.discordapp.net/attachments/1101574026582839437/1116825506726281257/maxresdefault.png?width=1193&height=671"];
    jjk = "https://media.discordapp.net/attachments/1155056320752394240/1155056344139833394/JJK_UHC_-_Nobara_by_Sissou.png?width=829&height=466";
    dawa = ["https://media.discordapp.net/attachments/1064668600285282315/1124759438188888064/cf45b92782ab0c90d2e29bb27961f0a4.gif","https://media.discordapp.net/attachments/1064668600285282315/1124759438583144508/AA0k.gif"];
    madoka = ["https://media.discordapp.net/attachments/1155055914194317332/1155055971236847626/Twix_Madoka1_1.png?width=829&height=466","https://media.discordapp.net/attachments/1155055914194317332/1155056243627536394/Twix_Sayaka.png?width=829&height=466"];
    fb = ["https://media.discordapp.net/attachments/1155056404583956531/1155056424653705216/Twix_FB1_1.png?width=829&height=466","https://media.discordapp.net/attachments/1155056404583956531/1177637672802590750/FB_UHC_-_GAMAH_x_TwiZzyx_masterclas_FINALE.png?ex=65733b8c&is=6560c68c&hm=b10c48c9c02a1ada6e16ec70676ba076f1f11578e9704a74bbaf03a7a5376e86&=&format=webp&width=1193&height=671"];
    bleach = "https://cdn.discordapp.com/attachments/1155056476432384000/1155056609031110697/maxresdefault.png";
    indus = "https://cdn.discordapp.com/attachments/1175838794944086016/1175838896878276649/Twix.png?ex=656cb04f&is=655a3b4f&hm=ce24167d7dadb10b0f03667bd19c292eb79d9231be4825a6de3e7ba6ee8cd995&";
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
    spidey = "https://media.discordapp.net/attachments/1064668600285282315/1122883486378885170/GIF_SPYDEY.gif?ex=65649bbd&is=655226bd&hm=bacc5f28001f6febd5d372fbacda9267163ca80a0171fdddc7ef88fc79a4ce8c&=";
    direct = "https://media.discordapp.net/attachments/1120085675463692349/1127896907138748517/direct.png?width=1193&height=671";
    autre = ["https://cdn.discordapp.com/attachments/748245620409761932/1167425216205557770/BYE.gif?ex=654e1475&is=653b9f75&hm=e812b225ad0bc06eb63577149c398554b696ef469d1064d16b9e33d6393ecb92&","https://cdn.discordapp.com/attachments/1064668600285282315/1064668676768415744/demJfjp.gif.gif"];
    MKLK = "https://media.discordapp.net/attachments/1064668600285282315/1136943663415558244/GIF_KLK_-_Imgur.gif?width=862&height=485";
    wiiSport = "https://media.discordapp.net/attachments/1064668600285282315/1138880259475910726/Wii_sport.gif?width=862&height=485";
    ygo = "https://media.discordapp.net/attachments/1064668600285282315/1174050772858708019/yu_gi_oh.gif?ex=656f697d&is=655cf47d&hm=2b10eb3d1e0b8a64be821011ba5add393f3708f0a9d687cb2a2925f1eb288e85&=";
    mario = "https://media.discordapp.net/attachments/1064668600285282315/1184574391313498212/MARIO-min.gif?ex=658c77df&is=657a02df&hm=1e26852a190a3e9b183e0c33eba620febc0853f6cb421eae4c8ab8127b7d2057&=";
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

                else if (titre == " ONE PIECE UHC "){
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

                else if (titre == "INDUSTRIAL UHC "){
                    return indus;
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
            }

            else if (jeubis[0] == "Marvel's" && jeubis[1] == "Spider-Man:"){
                return spidey;
            }

            else if (jeu == "IFSCL") {
                return lyoko;
            }

            else if (jeubis[0] == "Mario" || jeubis[1] == "Mario"){
                return mario;
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

            else if (titre == " TWIZZYX DIRECT "){
                return direct;
            }

            else if (titre == " MONTAGE D'UNE VIDEO AVEC VOUS "){
                return "https://cdn.discordapp.com/attachments/1120085675463692349/1158673971135393812/video-editing-jack-cole.gif?ex=651d1ab9&is=651bc939&hm=e07cae98b13d580fe941c56fbcda5596f0bb99f66208fca9d345393bf55e6c65&";
            }

            //Cas par defaut
            random = Math.floor(Math.random() * (autre.length));
            return autre[random];
        }
    }
    
            
}

//------------------------------------------------------------------------------------------------------------------------------
//                                                     Evènement Special
//------------------------------------------------------------------------------------------------------------------------------

//Construit le titre en fonction du message avec l'ajout d'un prefixe en plus du titre de base
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

//Construit la description en fonction du message
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

//Identifie le titre initial du stream afin de l'utiliser pour la minia
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

module.exports = {
    titreTravail,
    descriptionTravail,
    emoteTitre,
    chercheJeu,
    chercheMinia,
    titreTravail2,
    descriptionTravail2,
    chercheVraiTitre,
}