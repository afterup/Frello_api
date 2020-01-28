module.exports = (sequelize, DataTypes) => {
    const Card = sequelize.define(
        'Card',
        {
            // user_id, list_id
            card_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            title: {
                type: DataTypes.STRING(1000),
                allowNull: false
            },
            description: {
                type: DataTypes.STRING(2000),
                allowNull: true
            },
            position: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        { timestamps: true }
    );

    Card.associate = function(models) {
        Card.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'user_id'
        });
        Card.belongsTo(models.List, {
            foreignKey: 'list_id',
            targetKey: 'list_id'
        });
    };
    return Card;
};
