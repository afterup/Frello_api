const bcrypt = require('bcryptjs');

async function hashPassword (user) {
    const SALT_FACTOR = 8;
    if(!user.changed('password')) {
        return;
    };

    const genSalt = await bcrypt.genSalt(SALT_FACTOR);
    const hash = await bcrypt.hash(user.password, genSalt);
    user.setDataValue('password', hash);
}

module.exports = (sequelize, DataTypes) => { 
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    }, {
        hooks: {
            beforeSave: hashPassword
        }
    }

    );
    
    User.prototype.comparePassword = function(password) {
        return bcrypt.compare(password, this.password);
    };

    return User;
};