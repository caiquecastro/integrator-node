const Database = require('../../src/Adapters/Database');

test('It fetches the records', async () => {
    const databaseAdapter = new Database({
        driver: 'sqlite',
        connection: ':memory:',
        table: 'Users',
    });

    await databaseAdapter.connection.schema.createTable('Users', (t) => {
        t.string('name');
    });

    await databaseAdapter.connection.insert({ name: 'John' }).into('Users');

    const result = await databaseAdapter.fetch();

    expect(result).toEqual([
        {
            name: 'John',
        }
    ]);
});
