#!/usr/bin/env node
import argv from './argv';
import Integrator from './src/Integrator';
import SettingsParser from './src/SettingsParser';

(async () => {
  const integrator = new Integrator(SettingsParser.parse(argv.settings));

  await integrator.run();
})().then(() => {
  process.stdout.write('Integration finished');
  process.exit(0);
}).catch((err) => {
  process.stderr.write(`Integration failed ${err.message}`);
  process.exit(1);
});
