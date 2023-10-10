const { body, validationResult } = require('express-validator');

// Validaciones para la ruta services

const serviceValidations = [
	body('name')
		.isLength({ min: 5 })
		.withMessage('El nombre debe tener al menos 5 caracteres'),
	body('description')
		.isLength({ min: 5 })
		.withMessage('La descripción debe tener al menos 5 caracteres'),
	body('imageUrl').notEmpty().withMessage('La URL de la imagen no es válida'),
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
    serviceValidations,
    handleValidationErrors,
};