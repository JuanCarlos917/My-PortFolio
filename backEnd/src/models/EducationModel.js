const { DataTypes } = require('sequelize');

//Este modelo representara el historial educativo, incluyendo instituciones, títulos obtenidos, campo de estudio, fechas de inicio y fin.
module.exports = (sequelize) => {
	sequelize.define(
		'Education',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			degree: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			institution: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			field_of_study: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			startDate: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			endDate: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		},
	);
};
