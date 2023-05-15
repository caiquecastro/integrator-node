const knex = require('knex');

const validDatabaseClients = [
  'sqlite',
  'mssql',
  'mysql',
  'pg',
];

function parseConfig(config) {
  let parsedConfig = config;

  const databaseClient = config.client;

  if (!validDatabaseClients.includes(databaseClient)) {
    throw new Error('Invalid database client');
  }

  if (databaseClient === 'sqlite') {
    parsedConfig = {
      ...parsedConfig,
      useNullAsDefault: true,
    };
  }

  return parsedConfig;
}

class Database {
  constructor(config = {}) {
    this.config = parseConfig(config);

    this.connection = knex(this.config);
  }

  fetch() {
    const { columns } = this.config;

    return this.connection.select(columns).from(this.config.table);
  }

  write(rows = []) {
    return this.connection.batchInsert(this.config.table, rows, 100);
  }
}

module.exports = Database;
