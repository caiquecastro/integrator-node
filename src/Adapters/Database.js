const knex = require('knex');

function parseConfig(config) {
  return config;
}

class Database {
  constructor(config = {}) {
    this.config = parseConfig(config);

    this.connection = knex(this.config);
  }

  fetch() {
    return this.connection.select().from(this.config.table);
  }

  write(rows = []) {
    return this.connection.batchInsert(this.config.table, rows);
  }
}

module.exports = Database;
