const { body, validationResult } = require('express-validator');

// Validaciones para la ruta PUT de "Acerca de mí"
const updateGalleryValidations = [
	body('title').notEmpty().withMessage('El campo title es obligatorio '),
	body('description')
		.notEmpty()
		.withMessage('El campo description es obligatorio '),
	body('images')
		.notEmpty()
		.custom((value, { req }) => {
			if (!Array.isArray(value) || value.length === 0) {
				throw new Error(
					'El campo images no puede estar vacío y es obligatorio',
				);
			}
			return true;
		}),
];

// Función para manejar los errores de validación
const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

module.exports = {
	updateGalleryValidations,
	handleValidationErrors,
};
