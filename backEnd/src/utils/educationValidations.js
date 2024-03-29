const { body, validationResult } = require('express-validator');

const updateEducationValidations = [
	body('degree').notEmpty().withMessage('El campo degree es obligatorio'),
	body('description')
		.isLength({ min: 5 })
		.withMessage('El campo description es obligatorio y debe tener minimo 5 caracteres '),
	body('institution')
		.notEmpty()
		.withMessage('El campo institution es obligatorio'),
	body('field_of_study')
		.notEmpty()
		.withMessage('El campo field_of_study es obligatorio'),
	body('startDate')
		.notEmpty()
		.withMessage(
			'El campo startDate es obligatorio',
		),
	body('endDate')
		.notEmpty()
		.withMessage(
			'El campo startDate es obligatorio ',
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
	updateEducationValidations,
	handleValidationErrors,
};
