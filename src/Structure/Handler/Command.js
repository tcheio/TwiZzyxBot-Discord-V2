const fs = require('fs');
const path = require('path');

module.exports = async (bot) => {
    const commandsRoot = path.resolve(__dirname, '../../Commands');
    const commandSubFolders = fs.readdirSync(commandsRoot, { withFileTypes: true })
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name);

    for (const folder of commandSubFolders) {
        const folderPath = path.join(commandsRoot, folder);
        const commandFiles = fs.readdirSync(folderPath).filter(f => f.endsWith('.js'));

        for (const file of commandFiles) {
            try {
                const Command = require(path.join(folderPath, file));
                const data = new Command();

                if (!data.name) {
                    console.warn(`\x1b[33m[CommandLoader] Ignoré (pas de "name"): ${folder}/${file}\x1b[0m`);
                    continue;
                }
                if (bot.commands.has(data.name)) {
                    console.warn(`\x1b[33m[CommandLoader] Commande dupliquée "${data.name}" (${folder}/${file}) - écrase la précédente\x1b[0m`);
                }

                bot.commands.set(data.name, data);
                console.log(`\x1b[31mLa commande \x1b[35m${data.name}\x1b[31m est chargée depuis \x1b[35m${folder}\x1b[0m`);
            } catch (error) {
                console.error(`\x1b[31m[CommandLoader] Échec du chargement de ${folder}/${file}:\x1b[0m`, error);
            }
        }
    }
};
