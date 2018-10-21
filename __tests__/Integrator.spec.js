const Integrator = require('../src/Integrator');

test('It requires source and destination', async () => {
  try {
    const integrator = new Integrator();
    await integrator.run();

    throw new Error('Should not be thrown');
  } catch (err) {
    expect(err.message).toBe('It is required to provide source and destination config');
  }
});

test('It requires source and destination types', async () => {
  try {
    const integrator = new Integrator({
      source: {},
      destination: {},
    });
    await integrator.run();

    throw new Error('Should not be thrown');
  } catch (err) {
    expect(err.message).toBe('It is required to provide source and destination types');
  }
});

test('It requires valid type for source and destination', async () => {
  try {
    const integrator = new Integrator({
      source: {
        type: 'invalid',
      },
      destination: {
        type: 'invalid',
      },
    });

    throw new Error('Should not be thrown');
  } catch (err) {
    expect(err.message).toBe('Invalid type: invalid');
  }
});
