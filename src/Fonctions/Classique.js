function maxIntent(tab) {
    let max = 0;
    for (let i = 0; i < tab.length; i++) {
        if (tab[i] > max) {
            max = i;
        }
    }
    return max;
}

//Renvoie la date et l'heure
function temps() {
    const now = new Date();
    const minute = String(now.getMinutes()).padStart(2, '0');
    const mois = String(now.getUTCMonth() + 1).padStart(2, '0');
    return `${now.getHours()}:${minute}, le ${now.getDate()}/${mois}/${now.getFullYear()}`;
}

module.exports = {
    maxIntent,
    temps,
}
