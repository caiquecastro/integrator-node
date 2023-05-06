import knex from 'knex';

const validDatabaseClients = [
  'sqlite',
  'mssql',
  'mysql',
  'pg',
];

function parseConfig(config) {
  let parsedConfig = config;

  const databaseClient = config.client || config.dialect;

  if (!validDatabaseClients.includes(databaseClient)) {
    throw new Error('Invalid database client/dialect');
  }

  if (databaseClient === 'sqlite') {
    parsedConfig = {
      ...parsedConfig,
      useNullAsDefault: true,
    };
  }

  console.log({ parsedConfig });
  return parsedConfig;
}

export default class Database {
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
