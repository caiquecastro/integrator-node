const test = require('ava');
const manyRows = require('../fixtures/manyRows.json');
const Database = require('../../src/Adapters/Database');

function createDummyTable(connection) {
  return connection.schema.hasTable('Users')
    .then((exists) => {
      if (exists) {
        return Promise.resolve();
      }

      return connection.schema.createTable('Users', (table) => {
        table.increments('id');
        table.string('name');
        table.string('role');
        table.integer('age');
      });
    });
}

test('It validates the database dialect', async (t) => {
  try {
    const adapter = new Database({
      dialect: 'invalid',
    });

    await adapter.fetch();

    t.fail();
  } catch (err) {
    t.is(err.message, 'Invalid database client/dialect');
  }
});

test.serial('It fetches from sql server database', async (t) => {
  const adapter = new Database({
    dialect: 'mssql',
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

  await adapter.fetch();

  t.pass();
});

test('It fetches from mysql database', async (t) => {
  const adapter = new Database({
    dialect: 'mysql',
    connection: {
      host: 'mysql',
      user: 'integrator',
      password: 'integrator',
      database: 'Integrator',
    },
    table: 'Users',
  });

  await createDummyTable(adapter.connection);

  await adapter.fetch();

  t.pass();
});

test('It fetches from postgres database', async (t) => {
  const adapter = new Database({
    dialect: 'pg',
    connection: {
      host: 'postgres',
      user: 'integrator',
      password: 'integrator',
      database: 'integrator',
    },
    table: 'Users',
  });

  await createDummyTable(adapter.connection);

  await adapter.fetch();

  t.pass();
});

test('It fetches the records', async (t) => {
  const databaseAdapter = new Database({
    dialect: 'sqlite',
    connection: ':memory:',
    table: 'Users',
  });

  await databaseAdapter.connection.schema.createTable('Users', (table) => {
    table.string('name');
  });

  await databaseAdapter.connection.insert({ name: 'John' }).into('Users');

  const result = await databaseAdapter.fetch();

  t.deepEqual(result, [
    {
      name: 'John',
    },
  ]);
});

test('It fetches specified columns for the records', async (t) => {
  const databaseAdapter = new Database({
    dialect: 'sqlite',
    connection: ':memory:',
    table: 'Users',
    columns: [
      'email',
    ],
  });

  await databaseAdapter.connection.schema.createTable('Users', (table) => {
    table.string('name');
    table.string('email');
  });

  await databaseAdapter.connection.insert({
    name: 'John',
    email: 'johndoe@example.com',
  }).into('Users');

  const result = await databaseAdapter.fetch();

  t.deepEqual(result, [
    {
      email: 'johndoe@example.com',
    },
  ]);
});

test('It writes the records', async (t) => {
  const databaseAdapter = new Database({
    dialect: 'sqlite',
    connection: ':memory:',
    table: 'Users',
  });

  await databaseAdapter.connection.schema.createTable('Users', (table) => {
    table.string('name');
  });

  await databaseAdapter.write([
    {
      name: 'John',
    },
  ]);

  const results = await databaseAdapter.connection.select().from('Users');

  t.deepEqual(results, [
    {
      name: 'John',
    },
  ]);
});

test.serial('It writes in chunks on sql server database', async (t) => {
  const adapter = new Database({
    dialect: 'mssql',
    connection: {
      host: 'mssql',
      user: 'sa',
      password: 'integrator!23',
      options: {
        encrypt: false,
      },
    },
    table: 'Users',
  });

  await createDummyTable(adapter.connection);

  await adapter.write(manyRows);

  t.pass();
});
