import test from 'ava';
import Integrator from '../src/Integrator';

test('It requires source and destination', async (t) => {
  try {
    const integrator = new Integrator();
    await integrator.run();

    t.fail();
  } catch (err) {
    t.is(err.message, 'It is required to provide source and destination config');
  }
});

test('It requires source and destination types', async (t) => {
  try {
    const integrator = new Integrator({
      source: {},
      destination: {},
    });
    await integrator.run();

    t.fail();
  } catch (err) {
    t.is(err.message, 'It is required to provide source and destination types');
  }
});

test('It requires valid type for source and destination', async (t) => {
  try {
    const integrator = new Integrator({
      source: {
        type: 'invalid',
      },
      destination: {
        type: 'invalid',
      },
    });
    await integrator.run();

    t.fail();
  } catch (err) {
    t.is(err.message, 'Invalid type: invalid');
  }
});
