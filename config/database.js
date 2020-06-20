require('dotenv/config');

const config = {
    development: {
        username: 'root',
        password: process.env.DB_PASS,
        database: 'mobmap',
        host: 'localhost',
        dialect: 'mysql',
        define: {
            timestamps: true,
            operatorsAliases: false,
        },
    }
}

module.exports = config;