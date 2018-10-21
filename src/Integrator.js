function validateConfig (config = {}) {
    if (!config.source || !config.destination) {
        throw new Error('It is required to provide source and destination config');
    }

    return config;
}

class Integrator {
    constructor(config) {
        this.config = validateConfig(config);
    }

    run() {
        return Promise.resolve();
    }
}

module.exports = Integrator;
