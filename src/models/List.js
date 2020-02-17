module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define(
        'List',
        {
            // user_id, board_id
            list_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            title: {
                type: DataTypes.STRING(500),
                allowNull: false
            },
            position: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci' 
        }
    );

    List.associate = function(models) {
        List.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'user_id'
        });
        List.belongsTo(models.Board, {
            foreignKey: 'board_id',
            targetKey: 'board_id'
        });
        List.hasMany(models.Card, {
            foreignKey: { name: 'list_id', allowNull: false },
            sourceKey: 'list_id',
            onDelete: 'cascade'
        });
    };

    return List;
};
