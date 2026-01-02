function rechercheCaract(msg) {
    return msg.includes("#shorts");
}

/**
 * Détecte si le message mentionne "LOUNGE" (insensible à la casse)
 * @param {string} msg
 * @returns {boolean}
 */
function rechercheLounge(msg) {
  if (!msg) return false;
  return msg.toLowerCase().includes("lounge");
}

/**
 * Crée la description formatée à partir d'un message formaté "titre | description | lien | durée"
 * @param {string} msg
 * @returns {{ texte: string, isShort: boolean, isLounge: boolean }}
 */
function createDesc(msg) {
  const parts = msg.split('|');

  const titre = parts[0]?.trim() || "Titre non défini";
  const descriptionBlock = parts[1]?.trim() || "";
  const lien = parts[2]?.trim() || "https://www.youtube.com";
  const duree = parseInt(parts[3]);

  const isShort = !isNaN(duree) && duree <= 120;
  const isLounge = rechercheLounge(msg);

  if (isShort) {
    return { texte: `${titre}\n${lien}`, isShort: true, isLounge };
  }

  const descriptionLine = descriptionBlock
    .split('\n')
    .find(line => line.trim() !== "")?.trim() || "Description non trouvée";

  return { texte: `${titre}\n*${descriptionLine}*\n${lien}`, isShort: false, isLounge };
}

module.exports = {
  rechercheCaract,
  rechercheLounge,
  createDesc,
};