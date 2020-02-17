require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    db: {
        database: process.env.DB_NAME || 'trello',
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        options: {
            dialect: process.env.DIALECT || 'mysql',
            host: process.env.HOST,
            operatorsAliases: false
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }

};