function rechercheCaract(msg) {
    return msg.includes("#shorts");
}

function createDesc(msg) {
    const parts = msg.split('|');

    const titre = parts[0]?.trim() || "Titre non défini";
    const descriptionBlock = parts[1]?.trim() || "";
    const lien = parts[2]?.trim() || "https://www.youtube.com";

    // Prend uniquement la première ligne non vide
    const descriptionLine = descriptionBlock.split('\n').find(line => line.trim() !== "")?.trim() || "Description non trouvée";

    return `${titre}\n*${descriptionLine}*\n${lien}`;
}


module.exports = {
    rechercheCaract,
    createDesc,
}