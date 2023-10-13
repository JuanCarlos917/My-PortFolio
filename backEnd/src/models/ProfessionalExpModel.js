const { DataTypes } = require('sequelize');

//Este modelo permitira almacenar información sobre mi experiencia profesional.
module.exports = (sequelize) => {
    const ProfessionalExp = sequelize.define(
		'ProfessionalExp',
		{
			// Definición de los campos del modelo
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				unique: true,
			},
			company: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			position: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			startYear: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isNumeric: true,
					min: 1900,
					max: new Date().getFullYear(),
				},
			},
			startMonth: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isNumeric: true,
					min: 1,
					max: 12,
				},
			},
			endYear: {
				type: DataTypes.INTEGER,
				allowNull: true, // Permitir nulo en caso de que la experiencia laboral esté en curso
				validate: {
					isNumeric: true,
					min: 1900,
					max: new Date().getFullYear(),
				},
			},
			endMonth: {
				type: DataTypes.INTEGER,
				allowNull: true, // Permitir nulo en caso de que la experiencia laboral esté en curso
				validate: {
					isNumeric: true,
					min: 1,
					max: 12,
				},
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		},
	);
    return ProfessionalExp;
}