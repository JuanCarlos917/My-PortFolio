const { DataTypes } = require('sequelize');

// Este modelo permitirá crear un currículum en tu portafolio. Puedes incluir información sobre tu formación académica, experiencia laboral, habilidades y un resumen personal.

module.exports = (sequelize) => {
	const CV = sequelize.define(
		'CV',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastName: {
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
			proyects: {
				type: DataTypes.JSONB,
				allowNull: false,
				defaultValue: {},
				validate: {
					isValidUrl(value) {
						if (typeof value !== 'object') {
							throw new Error(
								'El campo proyects debe ser un objeto JSON.',
							);
						}
						for (const key in value) {
							if (
								!value[key].match(
									/^https?:\/\/[^\s/$.?#].[^\s]*$/i,
								)
							) {
								throw new Error(
									'La URL del proyecto no es válida.',
								);
							}
						}
					},
				},
			},
			experience: {
				type: DataTypes.JSONB,
				allowNull: false,
				defaultValue: {},
			},
		},
		{
			timestamps: false,
		},
	);
	return CV;
};
