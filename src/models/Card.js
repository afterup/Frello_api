
module.exports = (sequelize, DataTypes) => { 
    const Card = sequelize.define('Card', {
        card_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
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

    }, { timestamps: true });

    return Card;
};