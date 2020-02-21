import path from 'path';
require('dotenv').config();

if(process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: path.join(__dirname, '../../.env.dev') });
}else{
    require('dotenv').config({ path: path.join(__dirname, '../../.env.prod') });
}

export const configs = {
    port: process.env.PORT,
    db: {
        host: process.env.DB_HOST,
        dialect: process.env.DIALECT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        options: {
            operatorsAliases: false
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET
    }
};