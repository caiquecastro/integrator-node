const got = require('got');

function parseConfig(config) {
  if (!config.url) {
    throw new Error('The url must be provided for http integration');
  }

  return config;
}

class Http {
  constructor(config = {}) {
    this.config = parseConfig(config);
  }

  fetch() {
    return got(this.config.url)
      .then(({ body }) => JSON.parse(body));
  }

  write(rows) {
    return Promise.all(rows.map(row => got.post(this.config.url, {
      body: row,
      json: true,
    })));
  }
}

module.exports = Http;
