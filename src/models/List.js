
module.exports = (sequelize, DataTypes) => { 
    const List = sequelize.define('List', {
        list_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        title: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, { timestamps: true });

    return List;
};