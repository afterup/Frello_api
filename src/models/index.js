const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { configs } = require('../config/config');
const db = {};

const sequelize = new Sequelize({
    host: configs.db.host,
    username: configs.db.user,
    password: configs.db.password, 
    dialect: 'mysql',
    database: configs.db.database,
    port: configs.db.port
}
);

fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js')
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
