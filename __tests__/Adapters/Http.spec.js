const nock = require('nock');
const { t } = require('../helpers');
const Http = require('../../src/Adapters/Http');

describe('Http Adapter', () => {
  it('It requires url to fetch', async () => {
    try {
      const adapter = new Http({
        //
      });

      await adapter.fetch();

      t.fail();
    } catch (err) {
      t.is(err.message, 'The url must be provided for http integration');
    }
  });

  it('It fetches the records', async () => {
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

  it('It writes the records', async () => {
    const adapter = new Http({
      url: 'https://jsonplaceholder.typicode.com/users',
    });

    let requestCount = 0;

    nock('https://jsonplaceholder.typicode.com')
      .post('/users')
      .reply(201, (_, requestBody) => {
        requestCount += 1;

        return requestBody;
      });

    await adapter.write([
      {
        name: 'John',
        email: 'johndoe@example.com',
      },
    ]);

    t.is(requestCount, 1);
  });
});
