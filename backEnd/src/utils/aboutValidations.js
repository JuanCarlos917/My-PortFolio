const { body, validationResult } = require('express-validator');

// Validaciones para la ruta PUT de "Acerca de mí"
const updateAboutValidations = [
	body('bio')
		.isLength({ min: 5 })
		.withMessage('El campo bio debe tener al menos 5 caracteres'),
	body('skills').notEmpty().withMessage('El campo skills es obligatorio '),
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
