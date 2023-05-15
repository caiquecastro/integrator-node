import yargs from 'yargs';

export default yargs
  .option('settings')
  .demandOption(['settings'])
  .argv;
