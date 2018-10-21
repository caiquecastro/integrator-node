const Integrator = require('../src/Integrator');

test('It requires source and destination', async () => {
    try {
        new Integrator();

        throw new Error('Should not be thrown');
    } catch (err) {
        expect(err.message).toBe('It is required to provide source and destination config');
    }
});
