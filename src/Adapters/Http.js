const got = require('got');

class Http {
  constructor(config = {}) {
    this.config = config;
  }

  fetch() {
    return got(this.config.url)
      .then(({ body }) => JSON.parse(body));
  }
}

module.exports = Http;
