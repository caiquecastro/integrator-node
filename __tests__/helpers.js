const assert = require('assert');

const t = {
  is(actual, expected) {
    return assert.strictEqual(actual, expected);
  },
  true(actual) {
    return assert.strictEqual(actual, true);
  },
  deepEqual(actual, expected) {
    return assert.deepStrictEqual(actual, expected);
  },
  fail() {
    throw new Error('Should not be thrown');
  },
};

module.exports = { t };
