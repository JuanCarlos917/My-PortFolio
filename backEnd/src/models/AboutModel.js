const { DataTypes } = require('sequelize');

//Este modelo permitira almacenar información sobre mi, como una biografía, habilidades, experiencia laboral, formación académica, entre otros detalles relevantes.
module.exports = (sequelize) => {
	sequelize.define('About', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
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
};
