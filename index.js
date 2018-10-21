const Integrator = require('./src/Integrator');

const integrator = new Integrator({});

integrator.run()
    .then(() => {
        console.log('Integration finished');
    })
    .catch((err) => {
        console.log('Integration failed', err);
    });