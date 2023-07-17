const { DataTypes } = require('sequelize');

//Este modelo permitira crear una galería de imágenes en el portafolio. Se pueden organizar las imágenes en categorías o álbumes y agregar títulos y descripciones a cada imagen.
module.exports = (sequelize) => {
	sequelize.define(
		'Gallery',
		{
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
			},
			images: {
				type: DataTypes.ARRAY(DataTypes.STRING),
			},
		},
		{
			timestamps: false,
		},
	);
};
