const { DataTypes } = require('sequelize');

//Este modelo permitira almacenar información de calificaciones y comentarios

module.exports = (sequelize) => {
    const StarRating = sequelize.define(
		'StarRating',
		{
			// Definición de los campos del modelo
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				unique: true,
			},
			starRating: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 1,
					max: 5,
				},
			},
			comment: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
		},
		{
			timestamps: false,
		},
	);
    return StarRating;
}