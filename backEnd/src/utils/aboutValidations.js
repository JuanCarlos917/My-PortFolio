const { body, validationResult } = require('express-validator');

// Validaciones para la ruta PUT de "Acerca de mí"
const updateAboutValidations = [
	body('bio')
		.isLength({ min: 5 })
		.withMessage('El campo bio debe tener al menos 5 caracteres'),
	body('skills')
		.isLength({ min: 5 })
		.withMessage('El campo skills debe tener al menos 5 caracteres'),
	body('experience')
		.isLength({ min: 5 })
		.withMessage('El campo experience debe tener al menos 5 caracteres'),
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
	updateAboutValidations,
	handleValidationErrors,
};
