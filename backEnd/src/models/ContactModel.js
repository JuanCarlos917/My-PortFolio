const { DataTypes } = require('sequelize');

//Este modelo representa mis datos de contacto
module.exports = (sequelize) => {
	sequelize.define(
		'Contact',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
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
			social_media: {
				type: DataTypes.JSONB,
				allowNull: false,
				defaultValue: {},
				validate: {
					isValidUrl(value) {
						if (typeof value !== 'object') {
							throw new Error(
								'El campo social_media debe ser un objeto JSON.',
							);
						}
						for (const key in value) {
							if (
								!value[key].match(
									/^https?:\/\/[^\s/$.?#].[^\s]*$/i,
								)
							) {
								throw new Error(
									'La URL de la red social no es válida.',
								);
							}
						}
					},
				},
			},
		},
		{
			timestamps: false,
		},
	);
};
