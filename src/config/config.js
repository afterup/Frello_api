require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    db: {
        host: process.env.HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: 3306
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET
    }

};