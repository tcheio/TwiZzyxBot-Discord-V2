//Recherche la présence du #shorts dans le message
function rechercheCaract(msg){
    const msgBis = msg.split(" ");
    
    for (i = 0; i < msg.length; i++){
        if (msgBis[i] == "#shorts"){
            return true;
        }
    }
    return false;
}

//Ajoute la description choisi à l'annonce de vidéo existante
function createDesc(msg,desc){
    msgcomplet = "";
    msgBis = msg.split("");

    if(desc){
        for (i = 0; i < msgBis.length; i++){
            if (msgBis[i] == "|"){
                msgcomplet += "\n*"+desc+"*";
            }
        else{
            msgcomplet += msgBis[i];
            }
        }
    }
        else{
            for (i = 0; i < msgBis.length; i++){
                if (msgBis[i] != "|"){
                    msgcomplet += msgBis[i];
                }
        }
        
    }
    return msgcomplet;
}

module.exports = {
    rechercheCaract,
    createDesc,
}