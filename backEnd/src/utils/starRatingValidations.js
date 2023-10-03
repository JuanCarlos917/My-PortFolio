const { body, validationResult } = require('express-validator');

const starRatingValidations = [
	body('starRating')
		.notEmpty()
		.withMessage('El campo stars es obligatorio')
		.isInt()
		.withMessage('Las estrellas deben ser un número entero')
		.custom((value) => {
			if (value < 1 || value > 5) {
				throw new Error('La calificación debe estar entre 1 y 5');
			}
			return true;
		}),
];

const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

module.exports = {
    starRatingValidations,
    handleValidationErrors,
};