import test from 'ava';
import { rest } from 'msw';
import server from '../fixtures/server.js';
import Http from '../../src/Adapters/Http.js';

test.before(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
test.afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
test.after(() => server.close());

test('It requires url to fetch', async (t) => {
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

test('It fetches the records', async (t) => {
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

  t.deepEqual(result, [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    },
  ]);
});

test('It writes the records', async (t) => {
  const adapter = new Http({
    url: 'https://jsonplaceholder.typicode.com/users',
  });

  const result = await adapter.write([
    {
      name: 'John',
      email: 'johndoe@example.com',
    },
  ]);

  t.deepEqual(result, [
    {
      name: 'John',
      email: 'johndoe@example.com',
    },
  ]);
});
