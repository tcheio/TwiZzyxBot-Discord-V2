const env = process.env.BOT_ENV || 'prod';
let config;

switch (env) {
  case 'test':
  case 'dev':
    console.log('[CONFIG] Utilisation de la config TEST');
    config = require('./config-test');
    break;

  case 'prod':
  default:
    console.log('[CONFIG] Utilisation de la config PROD');
    config = require('./config-prod');
    break;
}

module.exports = config;
