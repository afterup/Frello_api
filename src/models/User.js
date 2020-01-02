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
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
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
            type: DataTypes.STRING(64),
            allowNull: false
        }
    }, {
        hooks: {
            beforeBulkUpdate: function(options) {
                options.individualHooks = true;
                return options;
            },
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword
        },
        timestamps: true
    }

    );
    
    User.prototype.comparePassword = function(password) {
        return bcrypt.compare(password, this.password);
    };

    return User;
};