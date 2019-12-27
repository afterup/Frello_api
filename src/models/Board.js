
module.exports = (sequelize, DataTypes) => { 
    const Board = sequelize.define('Board', {
        title: {
            type: DataTypes.STRING(20),
            required: true
        },
        background: {
            type: DataTypes.STRING(20),
            required: false
        }
    });

    return Board;
};