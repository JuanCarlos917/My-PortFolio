const { DataTypes } = require('sequelize');

//Este modelo permitira almacenar información sobre mi, como una biografía, habilidades, experiencia laboral, formación académica, entre otros detalles relevantes.
module.exports = (sequelize) => {
	const About = sequelize.define(
		'About',
		{
			// Definición de los campos del modelo
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				unique: true,
			},
			bio: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			skills: {
				type: DataTypes.JSONB,
				allowNull: false,
				defaultValue: {},
			},
			experience: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		},
	);
	return About;
};
