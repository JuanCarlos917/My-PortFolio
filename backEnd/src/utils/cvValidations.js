const { body, validationResult } = require('express-validator');

const updateCVValidations = [
	body('name').notEmpty().withMessage('El campo name es obligatorio'),
	body('lastName')
		.notEmpty()
		.withMessage('El campo social media es obligatorio'),
	body('email')
		.isEmail()
		.withMessage('El campo email debe ser un email válido'),
	body('phone')
		.isLength({ min: 7 })
		.withMessage('El campo teléfono debe tener al menos 7 caracteres'),
	body('social_media')
		.notEmpty()
		.withMessage('El campo social media es obligatorio'),
	body('imageUrl').notEmpty().withMessage('El campo imageUrl es obligatorio'),
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
	updateCVValidations,
	handleValidationErrors,
};
