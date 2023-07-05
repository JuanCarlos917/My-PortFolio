const { DataTypes } = require('sequelize');

//Este modelo permitira almacenar información sobre mi, como una biografía, habilidades, experiencia laboral, formación académica, entre otros detalles relevantes.
module.exports = (sequelize) => {
	const About = sequelize.define('About', {
		// Definición de los campos del modelo
		bio: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		skills: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		experience: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
	return About;
};





