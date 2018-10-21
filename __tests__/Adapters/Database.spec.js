const test = require('ava');
const Database = require('../../src/Adapters/Database');

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
