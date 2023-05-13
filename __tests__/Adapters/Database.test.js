import { describe, it, afterEach } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import Database from '../../src/Adapters/Database.js';

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

const manyRows = fs.readFileSync('__tests__/fixtures/manyRows.json', {
  encoding: 'utf-8',
});

describe('Database adapter', () => {
  let adapter;

  afterEach(() => adapter?.tearDown());

  it('It validates the database dialect', () => {
    assert.throws(() => {
      adapter = new Database({
        client: 'invalid',
      });
      assert.ok(adapter);
    }, new Error('Invalid database client/dialect'));
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

    await adapter.fetch();
  });

  it('It fetches from mysql database', async (t) => {
    adapter = new Database({
      client: 'mysql',
      connection: {
        host: '127.0.0.1',
        user: 'integrator',
        password: 'integrator!23',
        database: 'integrator',
      },
      table: 'Users',
    });

    await createDummyTable(adapter.connection);

    assert.deepEqual(await adapter.fetch(), []);
  });

  it('It fetches from postgres database', async () => {
    adapter = new Database({
      client: 'pg',
      connection: {
        host: '127.0.0.1',
        user: 'integrator',
        password: 'integrator!23',
        database: 'integrator',
      },
      table: 'Users',
    });

    await createDummyTable(adapter.connection);

    assert.deepEqual(await adapter.fetch(), []);
  });

  it('It fetches the records', async (t) => {
    adapter = new Database({
      client: 'sqlite',
      connection: ':memory:',
      table: 'Users',
    });

    await adapter.connection.schema.createTable('Users', (table) => {
      table.string('name');
    });

    await adapter.connection.insert({ name: 'John' }).into('Users');

    const result = await adapter.fetch();

    assert.deepEqual(result, [
      {
        name: 'John',
      },
    ]);
  });

  it('It fetches specified columns for the records', async (t) => {
    adapter = new Database({
      client: 'sqlite',
      connection: ':memory:',
      table: 'Users',
      columns: [
        'email',
      ],
    });

    await adapter.connection.schema.createTable('Users', (table) => {
      table.string('name');
      table.string('email');
    });

    await adapter.connection.insert({
      name: 'John',
      email: 'johndoe@example.com',
    }).into('Users');

    const result = await databaseAdapter.fetch();

    assert.deepEqual(result, [
      {
        email: 'johndoe@example.com',
      },
    ]);
  });

  it('It writes the records', async (t) => {
    adapter = new Database({
      client: 'sqlite',
      connection: ':memory:',
      table: 'Users',
    });

    await adapter.connection.schema.createTable('Users', (table) => {
      table.string('name');
    });

    await adapter.write([
      {
        name: 'John',
      },
    ]);

    const results = await adapter.connection.select().from('Users');

    assert.deepEqual(results, [
      {
        name: 'John',
      },
    ]);
  });

  it('It writes in chunks on sql server database', async (t) => {
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

    assert.deepEqual(await adapter.write(manyRows), [1, 2]);
  });
});
