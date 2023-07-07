const { DataTypes } = require('sequelize');

//Este modelo representara cada proyecto del portafolio. Los atributos pueden incluir el título del proyecto, descripción, tecnologías utilizadas, imagen relacionada, URL del proyecto, fecha de creación y fecha de actualización.
module.exports = (sequelize) => {
	sequelize.define('Project', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		technologies: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		url: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		created_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		updated_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	});
};
