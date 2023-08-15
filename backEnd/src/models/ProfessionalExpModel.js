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
			startDate: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			endDate: {
				type: DataTypes.DATEONLY,
				allowNull: false,
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