/**
 * Notrifications
 */

/**
 * Require all processor objects
 */
require('fs').readdirSync(__dirname + '/').forEach(function(file) {
  if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
    exports[file.replace('.js', '')] = require('./' + file);
  }
});