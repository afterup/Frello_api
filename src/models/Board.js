
module.exports = (sequelize, DataTypes) => { 
    const Board = sequelize.define('Board', {
        board_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
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
        }
    }, { timestamps: true });

    return Board;
};