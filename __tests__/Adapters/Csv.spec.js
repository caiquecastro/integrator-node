const fs = require('fs');
const del = require('del');
const test = require('ava');
const path = require('path');
const Csv = require('../../src/Adapters/Csv');

test.before(() => fs.mkdirSync('./__tests__/fixtures/tmp'));
test.afterEach(() => del('./__tests__/fixtures/tmp/*'));

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