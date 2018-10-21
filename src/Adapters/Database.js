const knex = require('knex');

function parseConfig (config) {
    return config;
}

class Database {
    constructor(config = {}) {
        this.config = parseConfig(config);

        this.connection = knex(this.config.connection);
    }

    fetch () {
        return this.connection.select().from(this.config.table);
    }
}

module.exports = Database;
