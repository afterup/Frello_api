module.exports = (sequelize, DataTypes) => {
	const Favorite = sequelize.define(
		'Favorite',
		{
			// board_id , user_id
			favorite_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
		},
		{ timestamps: false },
	);

	Favorite.associate = function(models) {
		Favorite.belongsTo(models.User, {
			foreignKey: 'user_id',
			targetKey: 'user_id',
		});
		Favorite.belongsTo(models.Board, {
			foreignKey: 'board_id',
			targetKey: 'board_id',
		});
	};

	return Favorite;
};
