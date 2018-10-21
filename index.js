const argv = require('./argv');
const Integrator = require('./src/Integrator');
const SettingsParser = require('./src/SettingsParser');

const integrator = new Integrator(SettingsParser.parse(argv.settings));

integrator.run()
    .then(() => {
        console.log('Integration finished');
        process.exit(0);
    })
    .catch((err) => {
        console.log('Integration failed', err);
        process.exit(1);
    });
