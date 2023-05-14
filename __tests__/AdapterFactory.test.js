import { describe, it } from 'node:test';
import assert from 'node:assert';
import CsvAdapter from '../src/Adapters/Csv.js';
import HttpAdapter from '../src/Adapters/Http.js';
import AdapterFactory from '../src/AdapterFactory.js';
import DatabaseAdapter from '../src/Adapters/Database.js';

describe('Adapter Factory', () => {
  it('It creates database adapter', async () => {
    const adapter = AdapterFactory({
      type: 'database',
      options: {
        client: 'sqlite',
      },
    });

    assert.equal(adapter instanceof DatabaseAdapter, true);
  });

  it('It creates csv adapter', async () => {
    const adapter = AdapterFactory({
      type: 'csv',
      options: {
        path: 'my-fake-file',
      },
    });

    assert.equal(adapter instanceof CsvAdapter, true);
  });

  it('It creates http adapter', async () => {
    const adapter = AdapterFactory({
      type: 'http',
      options: {
        url: 'http://api.com/users',
      },
    });

    assert.equal(adapter instanceof HttpAdapter, true);
  });
});
