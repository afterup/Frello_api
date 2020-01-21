
module.exports = (sequelize, DataTypes) => { 
    const Board = sequelize.define('Board', {
        board_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
            required: true
        },
        background: {
            type: DataTypes.STRING(20),
            allowNull: false,
            required: false
        },
        favorite: {
            type: DataTypes.BOOLEAN,
            required: false
        }
    }, { timestamps: true });

    return Board;
};