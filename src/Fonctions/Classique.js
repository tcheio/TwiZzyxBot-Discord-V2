function maxIntent(tab){
    let max = 0;
    for (let i = 0; i < tab.length; i++){
        if (tab[i] > tab[max]){
            max = i;
        }
    }
    if (max == 0){
        return 'KLK';
    }
    else if (max == 1){
        return '1';
    }
    else if (max == 2){
        return '2';
    }
    else if (max == 3){
        return '3';
    }
    else if (max == 4){
        return '4';
    }
    else if (max == 5){
        return '5';
    }
    else if (max == 6){
        return '6';
    }
    else if (max == 7){
        return '7';
    }
    else{
        return 'MC';
    }
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