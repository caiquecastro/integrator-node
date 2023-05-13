import fs from 'node:fs';
import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import path from 'path';
import Csv from '../../src/Adapters/Csv.js';

function deleteDir(pathName) {
  fs.rmSync(path.resolve(pathName), { recursive: true, force: true });
}

describe('Csv Adapter', () => {
  beforeEach(() => {
    deleteDir('./__tests__/fixtures/tmp');
    fs.mkdirSync(path.resolve('./__tests__/fixtures/tmp'));
  });
  afterEach(() => deleteDir('./__tests__/fixtures/tmp'));

  it('Requires argument for Csv Adapter', () => {
    assert.throws(() => {
      const adapter = new Csv();
      assert.ok(adapter);
    }, new Error('It\'s required to provide options for the integration'));
  });

  it('Requires path on options for Csv Adapter', async () => {
    assert.throws(() => {
      const adapter = new Csv({
        //
      });
      assert.ok(adapter);
    }, new Error('It\'s required to provide a file for the csv file'));
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
