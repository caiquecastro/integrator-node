import fs from 'fs';
import * as csv from 'csv';

function parseConfig(config) {
  if (!config) {
    throw new Error('It\'s required to provide options for the integration');
  }

  if (!config.path) {
    throw new Error('It\'s required to provide a file for the csv file');
  }

  return config;
}

export default class Csv {
  constructor(config) {
    this.config = parseConfig(config);
  }

  fetch() {
    const fileContent = fs.readFileSync(this.config.path, 'utf-8');
    const parserConfig = {
      columns: true,
      delimiter: ';',
    };

    return new Promise((resolve, reject) => {
      csv.parse(fileContent, parserConfig, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }).then((rows) => {
      if (!Array.isArray(this.config.columns)) {
        return rows;
      }

      return rows.map((row) => {
        const newRow = {};

        this.config.columns.forEach((column) => {
          newRow[column] = row[column];
        });

        return newRow;
      });
    });
  }

  write(rows) {
    const stringifyConfig = {
      header: true,
      delimiter: ';',
    };

    return new Promise((resolve, reject) => {
      csv.stringify(rows, stringifyConfig, (err, output) => {
        if (err) {
          reject(err);
        } else {
          fs.writeFileSync(this.config.path, output);

          resolve();
        }
      });
    });
  }
}
