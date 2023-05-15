import { describe, it } from 'node:test';
import assert from 'node:assert';
import Integrator from '../src/Integrator.js';

describe('Integrator', () => {
  it('It requires source and destination', () => {
    assert.throws(() => {
      const integrator = new Integrator();
      assert.ok(integrator);
    }, new Error('It is required to provide source and destination config'));
  });

  it('It requires source and destination types', () => {
    assert.throws(() => {
      const integrator = new Integrator({
        source: {},
        destination: {},
      });
      assert.ok(integrator);
    }, new Error('It is required to provide source and destination types'));
  });

  it('It requires valid type for source and destination', () => {
    assert.throws(() => {
      const integrator = new Integrator({
        source: {
          type: 'invalid',
        },
        destination: {
          type: 'invalid',
        },
      });
      assert.ok(integrator);
    }, new Error('Invalid type: invalid'));
  });
});
