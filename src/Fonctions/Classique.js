//Renvoie l'indice max d'un tableau
function maxIntent(tab){
    max = 0;
    for (i=0; i<tab.length;i++){
        if (tab[i] > max){
            max = i+1;
        }
    }
    return max;
}

//Renvoie la date et l'heure
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


module.exports = {
    maxIntent,
    temps,
}