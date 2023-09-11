const { body, validationResult } = require('express-validator');

const contacMeValidations =[
    body('name')
        .notEmpty()
        .withMessage('El nombre es obligatorio'),
    body('email')
        .notEmpty()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('El email no es válido'),
    body('message')
        .notEmpty()
        .withMessage('El mensaje es obligatorio')

]

const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

module.exports = {
    contacMeValidations,
    handleValidationErrors,
};