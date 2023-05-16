#!/usr/bin/env node
const argv = require('./argv');
const Integrator = require('./src/Integrator');
const SettingsParser = require('./src/SettingsParser');

(async () => {
  const integrator = new Integrator(SettingsParser.parse(argv.settings));

  await integrator.run();
})().then(() => {
  process.stdout.write('Integration finished\n');
  process.exit(0);
}).catch((err) => {
  process.stderr.write(`Integration failed: ${err}\n`);
  process.exit(1);
});
