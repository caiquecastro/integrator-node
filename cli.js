#!/usr/bin/env node
const argv = require('./argv');
const Integrator = require('./src/Integrator');
const SettingsParser = require('./src/SettingsParser');

(async () => {
  const integrator = new Integrator(SettingsParser.parse(argv.settings));

  await integrator.run();
})().then(() => {
  console.log('Integration finished');
  process.exit(0);
}).catch((err) => {
  console.error('Integration failed', err);
  process.exit(1);
});
