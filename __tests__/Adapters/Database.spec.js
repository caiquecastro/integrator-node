const { t } = require('../helpers');
const manyRows = require('../fixtures/manyRows.json');
const Database = require('../../src/Adapters/Database');

async function createDummyTable(connection, columns = []) {
  const hasTable = await connection.schema.hasTable('Users');

  if (hasTable) {
    await connection.schema.dropTable('Users');
  }

  await connection.schema.createTable('Users', (table) => {
    table.increments('id');
    table.string('name');
    if (columns.includes('email')) {
      table.string('email');
    }
    if (columns.includes('role')) {
      table.string('role');
    }
    if (columns.includes('age')) {
      table.integer('age');
    }
  });
}

async function insertDummyUsersData(connection) {
  await connection.insert({
    name: 'John',
    email: 'johndoe@example.com',
  }).into('Users');
}

describe('Database Adapter', () => {
  let adapter;

  afterEach(() => {
    if (adapter) {
      adapter.close();
    }
  });

  it('It validates the database client', async () => {
    try {
      adapter = new Database({
        client: 'invalid',
      });

      await adapter.fetch();

      t.fail();
    } catch (err) {
      t.is(err.message, 'Invalid database client');
    }
  });

  it('It fetches from sql server database', async () => {
    adapter = new Database({
      client: 'mssql',
      connection: {
        host: 'localhost',
        user: 'sa',
        password: 'integrator!23',
        options: {
          encrypt: false,
        },
      },
      table: 'Users',
    });

    await createDummyTable(adapter.connection);

    const result = await adapter.fetch();

    t.deepEqual(result, []);
  });

  it('It fetches from mysql database', async () => {
    adapter = new Database({
      client: 'mysql',
      connection: {
        host: 'localhost',
        user: 'integrator',
        password: 'integrator!23',
        database: 'Integrator',
      },
      table: 'Users',
    });

    await createDummyTable(adapter.connection);

    const result = await adapter.fetch();

    t.deepEqual(result, []);
  });

  it('It fetches from postgres database', async () => {
    adapter = new Database({
      client: 'pg',
      connection: {
        host: 'localhost',
        user: 'integrator',
        password: 'integrator!23',
        database: 'Integrator',
      },
      table: 'Users',
    });

    await createDummyTable(adapter.connection);

    const result = await adapter.fetch();

    t.deepEqual(result, []);
  });

  it('It fetches the records', async () => {
    adapter = new Database({
      client: 'sqlite',
      connection: ':memory:',
      table: 'Users',
    });

    await createDummyTable(adapter.connection, ['email']);

    await insertDummyUsersData(adapter.connection);

    const result = await adapter.fetch();

    t.deepEqual(result, [
      {
        id: 1,
        name: 'John',
        email: 'johndoe@example.com',
      },
    ]);
  });

  it('It fetches specified columns for the records', async () => {
    adapter = new Database({
      client: 'sqlite',
      connection: ':memory:',
      table: 'Users',
      columns: [
        'email',
      ],
    });

    await createDummyTable(adapter.connection, ['email']);

    await insertDummyUsersData(adapter.connection);

    const result = await adapter.fetch();

    t.deepEqual(result, [
      {
        email: 'johndoe@example.com',
      },
    ]);
  });

  it('It writes the records', async () => {
    adapter = new Database({
      client: 'sqlite',
      connection: ':memory:',
      table: 'Users',
    });

    await createDummyTable(adapter.connection, ['email']);

    await adapter.write([
      {
        name: 'John',
        email: 'johndoe@example.com',
      },
    ]);

    const results = await adapter.connection.select().from('Users');

    t.deepEqual(results, [
      {
        id: 1,
        name: 'John',
        email: 'johndoe@example.com',
      },
    ]);
  });

  it.only('It writes in chunks on sql server database', async () => {
    adapter = new Database({
      client: 'mssql',
      connection: {
        host: 'localhost',
        user: 'sa',
        password: 'integrator!23',
        options: {
          encrypt: false,
        },
      },
      table: 'Users',
    });

    await createDummyTable(adapter.connection, ['role', 'age']);

    await adapter.write(manyRows);
  });
});
