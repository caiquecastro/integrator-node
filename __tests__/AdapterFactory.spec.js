const test = require('ava');
const AdapterFactory = require('../src/AdapterFactory');
const DatabaseAdapter = require('../src/Adapters/Database');

test('It creates database adapter', async (t) => {
  const databaseAdapter = AdapterFactory({
    type: 'database',
    options: {
      client: 'sqlite',
    },
  });

  t.true(databaseAdapter instanceof DatabaseAdapter);
});
