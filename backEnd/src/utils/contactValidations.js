const { body, validationResult } = require('express-validator');

const createContactValidations = [
	body('name').isLength({ min: 1 }).withMessage('El campo name es obligatorio'),
	body('email')
		.isEmail()
		.withMessage(
			'El campo debe ser una dirección de correo electrónico válida',
		),
	body('phone').notEmpty().withMessage('El campo es obligatorio'),
    body('social_media').notEmpty().withMessage('El campo social media es obligatorio'),
];

const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

module.exports = {
	createContactValidations,
	handleValidationErrors,
};
