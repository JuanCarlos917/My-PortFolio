const { body, validationResult } = require('express-validator');

const profesionalExpValidations = [
	body('company').notEmpty().withMessage('El campo company es obligatorio'),
	body('description')
		.isLength({ min: 5 })
		.withMessage(
			'El campo description es obligatorio y debe tener minimo 5 caracteres ',
		),
	body('position').notEmpty().withMessage('El campo position es obligatorio'),
	body('startYear')
		.notEmpty()
		.withMessage('El campo startYear es obligatorio')
		.isInt({ min: 1900, max: new Date().getFullYear() })
		.withMessage('El campo startYear debe ser un año válido'),

	body('startMonth')
		.notEmpty()
		.withMessage('El campo startMonth es obligatorio')
		.isInt({ min: 1, max: 12 })
		.withMessage('El campo startMonth debe estar entre 1 y 12'),
	body('endYear')
		.optional()
		.isInt({ min: 1900, max: new Date().getFullYear() })
		.withMessage('El campo endYear debe ser un año válido'),

	body('endMonth')
		.optional()
		.isInt({ min: 1, max: 12 })
		.withMessage('El campo endMonth debe estar entre 1 y 12'),
];

const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

module.exports = {
	profesionalExpValidations,
	handleValidationErrors,
};