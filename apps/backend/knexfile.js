const config = require('./config');

module.exports = {
  development: config.DB,
  production: config.DB,
};