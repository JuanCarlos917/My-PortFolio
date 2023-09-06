const { body, validationResult } = require('express-validator');

const profesionalExpValidations = [
	body('company').notEmpty().withMessage('El campo company es obligatorio'),
	body('description')
		.isLength({ min: 5 })
		.withMessage(
			'El campo description es obligatorio y debe tener minimo 5 caracteres ',
		),
	body('position').notEmpty().withMessage('El campo position es obligatorio'),
	body('startDate')
		.notEmpty()
		.withMessage(
			'El campo startDate es obligatorio',
		)
		.notEmpty()
		.withMessage(
			'El campo startDate es obligatorio',
		)
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