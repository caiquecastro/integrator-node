import test from 'ava';
import CsvAdapter from '../src/Adapters/Csv.js';
import HttpAdapter from '../src/Adapters/Http.js';
import AdapterFactory from '../src/AdapterFactory.js';
import DatabaseAdapter from '../src/Adapters/Database.js';

test('It creates database adapter', async (t) => {
  const adapter = AdapterFactory({
    type: 'database',
    options: {
      client: 'sqlite',
    },
  });

  t.true(adapter instanceof DatabaseAdapter);
});

test('It creates csv adapter', async (t) => {
  const adapter = AdapterFactory({
    type: 'csv',
    options: {
      path: 'my-fake-file',
    },
  });

  t.true(adapter instanceof CsvAdapter);
});

test('It creates http adapter', async (t) => {
  const adapter = AdapterFactory({
    type: 'http',
    options: {
      url: 'http://api.com/users',
    },
  });

  t.true(adapter instanceof HttpAdapter);
});
