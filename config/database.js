require('dotenv/config');

const config = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        define: {
            timestamps: true,
            operatorsAliases: false,
        },
    }
}

module.exports = config;