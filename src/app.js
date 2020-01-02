const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');

const config = require('./config/config');
const { sequelize, User, Board, Favorite, List, Card } = require('./models');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

require('./routes/auth')(app);
require('./routes/board')(app);
require('./routes/card')(app);
require('./routes/list')(app);

User.hasMany(Board, { foreignKey: { name: 'user_id', allowNull: false }, sourceKey: 'user_id', onDelete: 'cascade' });
Board.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });

User.hasMany(Favorite, { foreignKey: { name: 'user_id', allowNull: false }, sourceKey: 'user_id', onDelete: 'cascade' });
Favorite.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });

User.hasMany(List, { foreignKey: { name: 'user_id', allowNull: false }, sourceKey: 'user_id', onDelete: 'cascade' });
List.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });

User.hasMany(Card, { foreignKey: { name: 'user_id', allowNull: false }, sourceKey: 'user_id', onDelete: 'cascade' });
Card.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });

Board.hasMany(Favorite, { foreignKey: { name: 'board_id', allowNull: false }, sourceKey: 'board_id', onDelete: 'cascade' });
Favorite.belongsTo(Board, { foreignKey: 'board_id', targetKey: 'board_id' });

Board.hasMany(List, { foreignKey: { name: 'board_id', allowNull: false }, sourceKey: 'board_id', onDelete: 'cascade' });
List.belongsTo(Board, { foreignKey: 'board_id', targetKey: 'board_id' });

List.hasMany(Card, { foreignKey: { name: 'list_id', allowNull: false }, sourceKey: 'list_id', onDelete: 'cascade' });
Card.belongsTo(List, { foreignKey: 'list_id', targetKey: 'list_id' });


sequelize.sync()
    .then(() => {
        app.listen(config.port);
        console.log(`Server started on port ${config.port}`);
    });