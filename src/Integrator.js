const AdapterFactory = require('./AdapterFactory');

function validateConfig(config = {}) {
  if (!config.source || !config.destination) {
    throw new Error('It is required to provide source and destination config');
  }

  const { source, destination } = config;

  if (!source.type || !destination.type) {
    throw new Error('It is required to provide source and destination types');
  }

  return config;
}

class Integrator {
  constructor(config) {
    this.config = validateConfig(config);

    this.source = AdapterFactory(this.config.source);
    this.destination = AdapterFactory(this.config.destination);
  }

  async run() {
    const result = await this.source.fetch();

    const output = await this.destination.write(result);

    await this.source.close();
    await this.destination.close();

    return output;
  }
}

module.exports = Integrator;
