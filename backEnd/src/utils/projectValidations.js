const { body, validationResult } = require('express-validator');

const projectValidations = [
	body('title')
		.notEmpty()
		.isLength({ min: 3 })

		.withMessage('El campo nombre debe tener al menos 3 caracteres'),
	body('description')
		.notEmpty()
		.isLength({ min: 5 })
		.withMessage('El campo descripción debe tener al menos 5 caracteres'),
        body('technologies')
        .notEmpty()
        .withMessage('El campo tecnologías es obligatorio'),
	body('url').isURL().withMessage('El campo url debe ser una url válida'),
	body('image')
		.notEmpty()
		.isURL()
		.withMessage('El campo imagen debe ser una url válida'),
];

const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

module.exports = {
    projectValidations,
    handleValidationErrors,
};