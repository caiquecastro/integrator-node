const DatabaseAdapter = require('./Adapters/Database');

module.exports = (config) => {
    switch (config.type) {
        case 'database':
            return new DatabaseAdapter(config);
    }

    throw new Error(`Invalid type: ${config.type}`);
};
