module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define(
        'Board',
        {
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
        },
        {
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci' 
        }
    );

    Board.associate = function(models) {
        Board.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'user_id'
        });
        Board.hasMany(models.Favorite, {
            foreignKey: { name: 'board_id', allowNull: false },
            sourceKey: 'board_id',
            onDelete: 'cascade'
        });
        Board.hasMany(models.List, {
            foreignKey: { name: 'board_id', allowNull: false },
            sourceKey: 'board_id',
            onDelete: 'cascade'
        });
    };

    return Board;
};
