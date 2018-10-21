const CsvAdapter = require('./Adapters/Csv');
const HttpAdapter = require('./Adapters/Http');
const DatabaseAdapter = require('./Adapters/Database');

module.exports = (config) => {
  switch (config.type) {
    case 'database':
      return new DatabaseAdapter(config.options);
    case 'csv':
      return new CsvAdapter(config.options);
    case 'http':
      return new HttpAdapter(config.options);
    default:
      throw new Error(`Invalid type: ${config.type}`);
  }
};
