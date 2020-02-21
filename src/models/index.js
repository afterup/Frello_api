const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { configs } = require('../config/config');
const db = {};

console.log(configs.db.user);
const sequelize = new Sequelize(
    configs.db.database,
    configs.db.user,
    configs.db.password, 
    {
        host: configs.db.host,
        dialect: 'mysql'
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
