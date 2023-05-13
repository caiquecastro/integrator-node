import fs from 'fs';
import { deleteAsync } from 'del';
import { describe, it, before, afterEach } from 'node:test';
import assert from 'node:assert';
import path from 'path';
import Csv from '../../src/Adapters/Csv.js';

before(() => fs.mkdirSync(path.resolve('./__tests__/fixtures/tmp')));
afterEach(() => deleteAsync('./__tests__/fixtures/tmp'));

describe('Csv Adapter', () => {
  it('Requires argument for Csv Adapter', async () => {
    try {
      const adapter = new Csv();

      await adapter.fetch();
    } catch (err) {
      assert.equal(err.message, 'It\'s required to provide options for the integration');
    }
  });

  it('Requires path on options for Csv Adapter', async () => {
    try {
      const adapter = new Csv({
        //
      });

      await adapter.fetch();
    } catch (err) {
      assert.equal(err.message, 'It\'s required to provide a file for the csv file');
    }
  });

  it('It fetches the records', async () => {
    const adapter = new Csv({
      path: path.resolve('./__tests__/fixtures/users.csv'),
    });

    const result = await adapter.fetch();

    assert.deepEqual(result, [
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

    assert.deepEqual(result, [
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

    assert.deepEqual(result, 'name;email\nJohn;johndoe@example.com\n');
  });
});
