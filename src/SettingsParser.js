const fs = require('fs');

class SettingsParser {
  static parse(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
}

module.exports = SettingsParser;
