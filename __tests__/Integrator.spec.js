const { t } = require('./helpers');
const Integrator = require('../src/Integrator');

describe('Integrator', () => {
  it('It requires source and destination', async () => {
    try {
      const integrator = new Integrator();
      await integrator.run();

      t.fail();
    } catch (err) {
      t.is(err.message, 'It is required to provide source and destination config');
    }
  });

  it('It requires source and destination types', async () => {
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

  it('It requires valid type for source and destination', async () => {
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
});
