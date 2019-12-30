
module.exports = (sequelize, DataTypes) => { 
    const Favorite = sequelize.define('Favorite', {
        // board_id , user_id
        favorite_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    }, { timestamps: false });

    return Favorite;
};