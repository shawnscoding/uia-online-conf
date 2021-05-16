
process.env.APP_CONFIG = '../../config-production.json';

const config = require('../config/config');


console.log('apiBaseUrl=' + config.apiBaseUrl);