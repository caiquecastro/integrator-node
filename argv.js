const yargs = require('yargs');

module.exports = yargs
  .option('settings')
  .demandOption(['settings'])
  .argv;
