class BaseAdapter {
  constructor() {
    this.data = null;
  }

  close() {
    this.data = null;
  }
}

module.exports = BaseAdapter;
