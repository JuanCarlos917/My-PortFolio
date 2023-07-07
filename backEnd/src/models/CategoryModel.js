const { DataTypes } = require('sequelize');

//Este modelo representara las categorías a las que pertenecen los proyectos. Se puedes asignar una o varias categorías a cada proyecto para organizarlos de acuerdo a su temática o tipo.
module.exports = (sequelize) => {
	sequelize.define(
		'Category',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		},
	);
};
