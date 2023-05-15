import fs from 'fs';

export default class SettingsParser {
  static parse(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
}
