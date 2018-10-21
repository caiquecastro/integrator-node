const AdapterFactory = require('../src/AdapterFactory');
const DatabaseAdapter = require('../src/Adapters/Database');

test('It creates database adapter', async () => {
    const databaseAdapter = AdapterFactory({
        type: 'database',
        connection: {
            client: 'sqlite',
        },
    });

    expect(databaseAdapter).toBeInstanceOf(DatabaseAdapter);
});
