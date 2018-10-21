const test = require('ava');
const Database = require('../../src/Adapters/Database');

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
