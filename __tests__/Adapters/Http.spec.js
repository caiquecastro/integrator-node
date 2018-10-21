const test = require('ava');
const nock = require('nock');
const Http = require('../../src/Adapters/Http');

test('It fetches the records', async (t) => {
  const adapter = new Http({
    url: 'https://jsonplaceholder.typicode.com/users',
  });

  nock('https://jsonplaceholder.typicode.com')
    .get('/users')
    .reply(200, [{
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    }]);

  const result = await adapter.fetch();

  t.deepEqual(result, [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    },
  ]);
});
