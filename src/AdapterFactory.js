const CsvAdapter = require('./Adapters/Csv');
const DatabaseAdapter = require('./Adapters/Database');

module.exports = (config) => {
  switch (config.type) {
    case 'database':
      return new DatabaseAdapter(config.options);
    case 'csv':
      return new CsvAdapter(config.options);
    default:
      throw new Error(`Invalid type: ${config.type}`);
  }
};
