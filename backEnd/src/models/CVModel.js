const { DataTypes } = require('sequelize');

//Este modelo permitira crear un currículum en tu portafolio. Puedes incluir información sobre tu formación académica, experiencia laboral, habilidades y un resumen personal.

module.exports = (sequelize) => {
	sequelize.define('CV', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		summary: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		education: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		experience: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		skills: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	});
};
