const test = require('ava');
const CsvAdapter = require('../src/Adapters/Csv');
const HttpAdapter = require('../src/Adapters/Http');
const AdapterFactory = require('../src/AdapterFactory');
const DatabaseAdapter = require('../src/Adapters/Database');

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
