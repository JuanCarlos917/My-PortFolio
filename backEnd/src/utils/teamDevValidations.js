const { body, validationResult } = require('express-validator');

// Validaciones para la ruta PUT de teamDev
const updateTeamDevValidations = [
	body('name').notEmpty().withMessage('El campo name es obligatorio'),
	body('email')
		.isEmail()
		.withMessage('El campo debe ser un correo electrónico válido')
		.notEmpty()
		.withMessage('El campo es obligatorio'),
	body('social_network')
		.isURL()
		.withMessage('El campo debe ser una URL válida'),
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
	updateTeamDevValidations,
	handleValidationErrors,
};
