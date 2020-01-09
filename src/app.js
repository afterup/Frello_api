const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./config/passport');

// Create global app object
const app = express();

// express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
passportConfig();

const config = require('./config/config');
const { sequelize, User, Board, Favorite, List, Card } = require('./models');

app.use(require('./routes/index'));


/// error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message,
            error: {}
        }
    });
});


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