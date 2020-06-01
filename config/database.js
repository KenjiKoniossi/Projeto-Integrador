require('dotenv/config');

const config = {
    development: {
        username: 'root',
        password: process.env.DB_PASS,
        database: 'mobmap2',
        host: 'localhost',
        dialect: 'mysql',
        define: {
            timestamps: true
        },
    }
}

module.exports = config;