const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config/config');

module.exports = (sequelize, DataTypes) => { 
    const User = sequelize.define('User', {
        user_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
        email: { type: DataTypes.STRING(50), allowNull: false, unique: true },
        username: { type: DataTypes.STRING(30), allowNull: false, unique: true },
        password: { type: DataTypes.STRING(64), allowNull: false }
    }, { timestamps: true });
    
    User.prototype.comparePassword = function(password) {
        return bcrypt.compare(password, this.password);
    };

    User.prototype.hashPassword = async function(user) {
        const SALT_FACTOR = 8;
    
        const genSalt = await bcrypt.genSalt(SALT_FACTOR);
        const hash = await bcrypt.hash(user.password, genSalt);
        user.setDataValue('password', hash);
    };

    User.prototype.generateJWT = function() {
        const ONE_WEEK = 60 * 60 * 24 * 7;
        return jwt.sign(
            {
                user_id: this.user_id,
                username: this.username,
                exp: ONE_WEEK
            }, 
            config.authentication.jwtSecret
        );
    };

    User.prototype.toAuthJSON = function() {
        return {
            username: this.username,
            email: this.email,
            token: this.generateJWT()
        };
    };

    return User;
};