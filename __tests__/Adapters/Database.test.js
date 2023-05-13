import { describe, it } from 'node:test';
import assert from 'node:assert';
import manyRows from '../fixtures/manyRows.json' assert { type: 'json' };
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

describe('Database adapter', () => {
  it('It validates the database dialect', () => {
    assert.throws(() => {
      const adapter = new Database({
        client: 'invalid',
      });
      assert.ok(adapter);
    }, new Error('Invalid database client/dialect'));
  });

  it('It fetches from sql server database', async () => {
    const adapter = new Database({
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

    //t.pass();
  });

  it('It fetches from mysql database', async (t) => {
    const adapter = new Database({
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
    const adapter = new Database({
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
    const databaseAdapter = new Database({
      client: 'sqlite',
      connection: ':memory:',
      table: 'Users',
    });

    await databaseAdapter.connection.schema.createTable('Users', (table) => {
      table.string('name');
    });

    await databaseAdapter.connection.insert({ name: 'John' }).into('Users');

    const result = await databaseAdapter.fetch();

    assert.deepEqual(result, [
      {
        name: 'John',
      },
    ]);
  });

// it('It fetches specified columns for the records', async (t) => {
//   const databaseAdapter = new Database({
//     client: 'sqlite',
//     connection: ':memory:',
//     table: 'Users',
//     columns: [
//       'email',
//     ],
//   });

//   await databaseAdapter.connection.schema.createTable('Users', (table) => {
//     table.string('name');
//     table.string('email');
//   });

//   await databaseAdapter.connection.insert({
//     name: 'John',
//     email: 'johndoe@example.com',
//   }).into('Users');

//   const result = await databaseAdapter.fetch();

//   t.deepEqual(result, [
//     {
//       email: 'johndoe@example.com',
//     },
//   ]);
// });

// it('It writes the records', async (t) => {
//   const databaseAdapter = new Database({
//     client: 'sqlite',
//     connection: ':memory:',
//     table: 'Users',
//   });

//   await databaseAdapter.connection.schema.createTable('Users', (table) => {
//     table.string('name');
//   });

//   await databaseAdapter.write([
//     {
//       name: 'John',
//     },
//   ]);

//   const results = await databaseAdapter.connection.select().from('Users');

//   t.deepEqual(results, [
//     {
//       name: 'John',
//     },
//   ]);
// });

// test.serial('It writes in chunks on sql server database', async (t) => {
//   const adapter = new Database({
//     client: 'mssql',
//     connection: {
//       host: 'localhost',
//       user: 'sa',
//       password: 'integrator!23',
//       options: {
//         encrypt: false,
//       },
//     },
//     table: 'Users',
//   });

//   await createDummyTable(adapter.connection);

//   await adapter.write(manyRows);

//   t.pass();
// });
});
