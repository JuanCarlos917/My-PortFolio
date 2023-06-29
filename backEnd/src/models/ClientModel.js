const { DataTypes } = require('sequelize');

//Este modelo representara los clientes o personas relacionadas con cada proyecto. Se puede almacenar el nombre del cliente, su correo electrónico y número de teléfono para tener un registro de las personas involucradas en los proyectos.
module.exports = (sequelize) => {
	sequelize.define('Client', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.TEXT,
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
	});
};
