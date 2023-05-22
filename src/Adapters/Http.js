function parseConfig(config) {
  if (!config.url) {
    throw new Error('The url must be provided for http integration');
  }

  return config;
}

export default class Http {
  constructor(config = {}) {
    this.config = parseConfig(config);
  }

  fetch() {
    return fetch(this.config.url)
      .then((res) => res.json());
  }

  write(rows) {
    const requests = rows.map((row) => fetch(this.config.url, {
      method: 'POST',
      body: JSON.stringify(row),
    }).then((res) => res.json()));

    return Promise.all(requests);
  }
}
