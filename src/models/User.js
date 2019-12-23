const bcrypt = require('bcrypt-nodejs');

function hashPassword (user, options) {
    const SALT_FACTOR = 8;

    if(!user.changed('password')) {
        return;
    }

    console.log(user.password);

    return bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if(err) {
            console.log(err);
        }else {
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if(err) {
                    console.log(err);
                }else{ console.log('check'); user.setDataValue('password', hash); };
            });
        }
    });
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
        return bcrypt.compareAsync(password, this.password);
    };

    return User;
};