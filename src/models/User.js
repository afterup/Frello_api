import { configs } from '../config/config';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            user_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            email: { type: DataTypes.STRING(50), allowNull: false, unique: true },
            username: { type: DataTypes.STRING(30), allowNull: false, unique: true },
            password: { type: DataTypes.STRING(64), allowNull: false }
        },
        {
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci' 
        }
    );

    User.prototype.validPassword = function(password) {
        return bcrypt.compare(password, this.password).then(result => { return result; });
    };

    User.prototype.hashPassword = async function(password) {
        const SALT_FACTOR = 8;

        const genSalt = await bcrypt.genSalt(SALT_FACTOR);
        const hash = await bcrypt.hash(password, genSalt);
        this.setDataValue('password', hash);
    };

    User.prototype.generateJWT = function(id) {
        return jwt.sign({ user_id: id, username: this.username },
            process.env.JWT_SECRET
        );
    };

    User.prototype.toAuthJSON = function(id) {
        return {
            user: { username: this.username, email: this.email },
            token: this.generateJWT(id)
        };
    };

    User.associate = function(models) {
        User.hasMany(models.Board, {
            foreignKey: { name: 'user_id', allowNull: false },
            sourceKey: 'user_id',
            onDelete: 'cascade'
        });
        User.hasMany(models.List, {
            foreignKey: { name: 'user_id', allowNull: false },
            sourceKey: 'user_id',
            onDelete: 'cascade'
        });
        User.hasMany(models.Card, {
            foreignKey: { name: 'user_id', allowNull: false },
            sourceKey: 'user_id',
            onDelete: 'cascade'
        });
    };

    return User;
};
