import { rest } from 'msw';
import assert from 'node:assert';
import { describe, it, before, afterEach, after } from 'node:test';
import server from '../fixtures/server.js';
import Http from '../../src/Adapters/Http.js';

describe('Http Adapter', () => {
  before(() => server.listen());

  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  afterEach(() => server.resetHandlers());

  // Clean up after the tests are finished.
  after(() => server.close());

  it('It requires url to fetch', async () => {
    assert.throws(() => {
      const adapter = new Http({
        //
      });

      assert.ok(adapter);
    }, new Error('The url must be provided for http integration'));
  });

it('It fetches the records', async () => {
  const adapter = new Http({
    url: 'https://jsonplaceholder.typicode.com/users',
  });

  server.use(
    rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => res(
      ctx.json([{
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
      }]),
    )),
  );

  const result = await adapter.fetch();

  assert.deepEqual(result, [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    },
  ]);
});

it('It writes the records', async (t) => {
  const adapter = new Http({
    url: 'https://jsonplaceholder.typicode.com/users',
  });

  let requestCount = 0;

  server.use(
    rest.post('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
      requestCount += 1;
      return res(
        ctx.json([{
          id: 1,
          name: 'John Doe',
          email: 'johndoe@example.com',
        }]),
      );
    }),
  );

  await adapter.write([
    {
      name: 'John',
      email: 'johndoe@example.com',
    },
  ]);

  assert.equal(requestCount, 1);
});
});
