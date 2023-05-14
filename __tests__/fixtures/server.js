import { setupServer } from 'msw/node';

const handlers = [
  //
];

const server = setupServer(...handlers);

export default server;
