const fs = require('fs');
const path = require('path');


module.exports = function loadEvents(bot, context = {}) {
  const root = path.resolve(__dirname, '../../Events');

  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir)) {
      const full = path.join(dir, entry);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) { walk(full); continue; }
      if (!entry.endsWith('.js')) continue;

      try {
        const mod = require(full);

        // 1) Pattern objet
        if (mod && typeof mod.execute === 'function' && mod.name) {
          const handler = (...args) => {
            Promise.resolve(mod.execute(...args, bot, context)).catch(err => {
              console.error(`\x1b[31m[EventLoader] Erreur dans l'event "${mod.name}" (${path.relative(root, full)}):\x1b[0m`, err);
            });
          };
          if (mod.once) bot.once(mod.name, handler);
          else bot.on(mod.name, handler);
          console.log(`\x1b[32m[EventLoader]\x1b[0m event: \x1b[35m${mod.name}\x1b[0m <- ${path.relative(root, full)}`);
          continue;
        }

        // 2) Registrar explicite (fonction marquée)
        if (typeof mod === 'function' && mod.__register === true) {
          mod(bot, context);
          console.log(`\x1b[32m[EventLoader]\x1b[0m registrar: \x1b[35m${path.relative(root, full)}\x1b[0m`);
          continue;
        }
      } catch (error) {
        console.error(`\x1b[31m[EventLoader] Échec du chargement de ${path.relative(root, full)}:\x1b[0m`, error);
      }
    }
  };

  walk(root);
};
