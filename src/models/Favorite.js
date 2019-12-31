
module.exports = (sequelize, DataTypes) => { 
    const Favorite = sequelize.define('Favorite', {
        // board_id , user_id
        favorite_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }, { timestamps: false });

    return Favorite;
};