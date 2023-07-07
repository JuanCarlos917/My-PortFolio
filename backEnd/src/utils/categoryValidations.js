const { body, validationResult } = require('express-validator');


const createCategoryValidations = [
	body('name')
		.notEmpty()
		.withMessage('El nombre de la categoría es obligatorio'),
];

const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

module.exports = {
	createCategoryValidations,
	handleValidationErrors,
};;
