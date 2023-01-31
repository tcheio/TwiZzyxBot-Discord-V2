const { Client, GatewayIntentBits, Collection } = require('discord.js');
//export default alt.createActions(Fonction);

class Fonction {

    static rechercheCaract(msg){
        const msgBis = msg.split(" ");
            if (msgBis[msgBis.length-2] == "#shorts"){
                return true;
            }
            return false;
    }

    static titreTravail(msg){
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

    static temps(){
        var now = new Date();
        //Traitement Minute 
        minute = now.getMinutes().toString();
        console.log(minute.length);
        if (minute.length == 1){ minute = "0"+now.getMinutes(); }

        //Traitement Mois
        mois = parseInt((now.getUTCMonth()+1))
        mois = mois.toString();
        if (mois.length == 1){ mois = "0"+parseInt((now.getUTCMonth()+1)); console.log}

        tempsDate = (now.getHours()+1)+":"+minute+", le " + now.getDate()+"/"+mois+"/"+now.getFullYear();

        return tempsDate;
    }

}