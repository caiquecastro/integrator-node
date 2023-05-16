const fs = require('fs');
const path = require('path');
const { t } = require('../helpers');
const Csv = require('../../src/Adapters/Csv');

describe('Csv Adapter', () => {
  beforeEach(() => fs.mkdirSync('./__tests__/fixtures/tmp'));
  afterEach(() => fs.rmSync('./__tests__/fixtures/tmp', { recursive: true, force: true }));

  it('Requires argument for Csv Adapter', async () => {
    try {
      const adapter = new Csv();

      await adapter.fetch();

      t.fail();
    } catch (err) {
      t.is(err.message, 'It\'s required to provide options for the integration');
    }
  });

  it('Requires path on options for Csv Adapter', async () => {
    try {
      const adapter = new Csv({
        //
      });

      await adapter.fetch();

      t.fail();
    } catch (err) {
      t.is(err.message, 'It\'s required to provide a file for the csv file');
    }
  });

  it('It fetches the records', async () => {
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

  it('It fetches specified columns for the records', async () => {
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

  it('It writes the records', async () => {
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

    t.is(result, 'name;email\nJohn;johndoe@example.com\n');
  });
});
