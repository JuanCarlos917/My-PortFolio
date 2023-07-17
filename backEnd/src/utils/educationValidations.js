const { body, validationResult } = require('express-validator');

const updateEducationValidations = [
	body('degree').notEmpty().withMessage('El campo degree es obligatorio'),
	body('description')
		.notEmpty()
		.withMessage('El campo description es obligatorio '),
	body('institution')
		.notEmpty()
		.withMessage('El campo institution es obligatorio'),
	body('field_of_study')
		.notEmpty()
		.withMessage('El campo field_of_study es obligatorio'),
	body('startDate')
		.notEmpty()
		.withMessage(
			'El campo startDate es obligatorio y debe estar en formato YY-MM-DD',
		)
		.isDate()
		.withMessage('El campo startDate debe estar en formato YY-MM-DD'),
	body('endDate')
		.notEmpty()
		.withMessage(
			'El campo startDate es obligatorio y debe estar en formato YY-MM-DD',
		)
		.isDate()
		.withMessage('El campo startDate debe estar en formato YY-MM-DD'),
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
