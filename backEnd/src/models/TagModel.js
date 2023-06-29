const { DataTypes } = require('sequelize');

//Este modelo representara las etiquetas o palabras clave asociadas a los proyectos. Se puede asignar una o varias etiquetas a cada proyecto para facilitar su búsqueda y clasificación.
module.exports = (sequelize) => {
	sequelize.define('Tag', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
