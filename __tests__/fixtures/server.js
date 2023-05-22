import { rest } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  rest.post('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => res(
    ctx.json({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    }),
  )),
];

const server = setupServer(...handlers);

export default server;
