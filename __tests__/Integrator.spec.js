const Integrator = require('../src/Integrator');

test('It requires source and destination', async () => {
    try {
        new Integrator();

        throw new Error('Should not be thrown');
    } catch (err) {
        expect(err.message).toBe('It is required to provide source and destination config');
    }
});

test('It requires source and destination types', async () => {
    try {
        new Integrator({
            source: {},
            destination: {},
        });

        throw new Error('Should not be thrown');
    } catch (err) {
        expect(err.message).toBe('It is required to provide source and destination types');
    }
});

test('It requires valid type for source and destination', async () => {
    try {
        new Integrator({
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
