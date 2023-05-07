import fs from 'fs';
import { deleteAsync } from 'del';
import test from 'ava';
import path from 'path';
import Csv from '../../src/Adapters/Csv.js';

test.before(() => fs.mkdirSync('./__tests__/fixtures/tmp'));
test.afterEach(() => deleteAsync('./__tests__/fixtures/tmp'));

test('Requires argument for Csv Adapter', async (t) => {
  try {
    const adapter = new Csv();

    await adapter.fetch();
  } catch (err) {
    t.is(err.message, 'It\'s required to provide options for the integration');
  }
});

test('Requires path on options for Csv Adapter', async (t) => {
  try {
    const adapter = new Csv({
      //
    });

    await adapter.fetch();
  } catch (err) {
    t.is(err.message, 'It\'s required to provide a file for the csv file');
  }
});

test('It fetches the records', async (t) => {
  const adapter = new Csv({
    path: path.resolve('./__tests__/fixtures/users.csv'),
  });

  const result = await adapter.fetch();

  t.deepEqual(result, [
    {
      name: 'John',
      email: 'johndoe@example.com',
    },
  ]);
});

test('It fetches specified columns for the records', async (t) => {
  const adapter = new Csv({
    path: path.resolve('./__tests__/fixtures/users.csv'),
    columns: [
      'email',
    ],
  });

  const result = await adapter.fetch();

  t.deepEqual(result, [
    {
      email: 'johndoe@example.com',
    },
  ]);
});

test('It writes the records', async (t) => {
  const adapter = new Csv({
    path: path.resolve('./__tests__/fixtures/tmp/users.csv'),
  });

  await adapter.write([
    {
      name: 'John',
      email: 'johndoe@example.com',
    },
  ]);

  const result = fs.readFileSync(path.resolve('./__tests__/fixtures/tmp/users.csv'), 'utf-8');

  t.deepEqual(result, 'name;email\nJohn;johndoe@example.com\n');
});
