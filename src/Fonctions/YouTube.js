function rechercheCaract(msg) {
    return msg.includes("#shorts");
}

function createDesc(msg) {
    const parts = msg.split('|');

    const titre = parts[0]?.trim() || "Titre non défini";
    const descriptionBlock = parts[1]?.trim() || "";
    const lien = parts[2]?.trim() || "https://www.youtube.com";
    const duree = parseInt(parts[3]);

    const isShort = !isNaN(duree) && duree <= 120;

    if (isShort) {
        return { texte: `${titre}\n${lien}`, isShort: true };
    }

    const descriptionLine = descriptionBlock
        .split('\n')
        .find(line => line.trim() !== "")?.trim() || "Description non trouvée";

    return { texte: `${titre}\n*${descriptionLine}*\n${lien}`, isShort: false };
}




module.exports = {
    rechercheCaract,
    createDesc,
}