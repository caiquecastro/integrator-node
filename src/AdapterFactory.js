import CsvAdapter from './Adapters/Csv';
import HttpAdapter from './Adapters/Http';
import DatabaseAdapter from './Adapters/Database';

export default (config) => {
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
