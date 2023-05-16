const { t } = require('./helpers');
const CsvAdapter = require('../src/Adapters/Csv');
const HttpAdapter = require('../src/Adapters/Http');
const AdapterFactory = require('../src/AdapterFactory');
const DatabaseAdapter = require('../src/Adapters/Database');

describe('Adapter Factory', () => {
  it('It creates database adapter', async () => {
    const adapter = AdapterFactory({
      type: 'database',
      options: {
        client: 'sqlite',
      },
    });

    t.true(adapter instanceof DatabaseAdapter);
  });

  it('It creates csv adapter', async () => {
    const adapter = AdapterFactory({
      type: 'csv',
      options: {
        path: 'my-fake-file',
      },
    });

    t.true(adapter instanceof CsvAdapter);
  });

  it('It creates http adapter', async () => {
    const adapter = AdapterFactory({
      type: 'http',
      options: {
        url: 'http://api.com/users',
      },
    });

    t.true(adapter instanceof HttpAdapter);
  });
});
