const { exec } = require('child_process');

// Fonction pour mettre à jour le bot depuis le dépôt Git
function updateBot() {
  console.log('Mise à jour du bot en cours...');

  exec('git pull', (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors de la mise à jour : ${stderr}`);
    } else {
      console.log(`Mise à jour réussie: ${stdout}`);
    }
  });
}

module.exports = { updateBot };

