const got = require('got');
const BaseAdapter = require('./BaseAdapter');

function parseConfig(config) {
  if (!config.url) {
    throw new Error('The url must be provided for http integration');
  }

  return config;
}

class Http extends BaseAdapter {
  constructor(config = {}) {
    super();
    this.config = parseConfig(config);
  }

  fetch() {
    return got(this.config.url)
      .then(({ body }) => JSON.parse(body));
  }

  write(rows) {
    return Promise.all(rows.map((row) => got.post(this.config.url, {
      json: row,
      responseType: 'json',
    })));
  }
}

module.exports = Http;
