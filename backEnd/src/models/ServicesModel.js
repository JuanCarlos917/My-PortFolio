const { DataTypes } = require('sequelize');

//Este modelo permitira almacenar información sobre los servicios que ofrezco, como el nombre del servicio, una descripción, el precio, entre otros detalles relevantes.
module.exports = (sequelize) => {
    const Services = sequelize.define(
		'Services',
		{
			// Definición de los campos del modelo
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				unique: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: true,
				defaultValue: 0,
			},
			imageUrl: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
		},
		{
			timestamps: false,
		},
	);
    return Services;
}