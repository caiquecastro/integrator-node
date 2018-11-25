const fs = require('fs');
const del = require('del');
const test = require('ava');
const path = require('path');
const Csv = require('../../src/Adapters/Csv');

const tmpFixtureDir = './__tests__/fixtures/tmp';

test.before(() => {
  if (fs.existsSync(tmpFixtureDir)) {
    return;
  }

  fs.mkdirSync(tmpFixtureDir);
});
test.afterEach(() => del(tmpFixtureDir));

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

test('It writes the records on file', async (t) => {
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

test('Allow custom io method', async (t) => {
  const adapter = new Csv({
    ioType: 'none',
  });

  const result = await adapter.write([
    {
      name: 'John',
      email: 'johndoe@example.com',
    },
  ]);

  t.deepEqual(result, 'name;email\nJohn;johndoe@example.com\n');
});
