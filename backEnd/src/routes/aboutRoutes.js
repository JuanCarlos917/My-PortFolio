const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express();
const { getAbout, updateAbout } = require('../controllers/AboutController');

// Ruta para obtener la información de "Acerca de mí"
router.get('/', getAbout);

// Ruta para actualizar la información de "Acerca de mí"
router.put(
	'/',
	// Validación
	body('bio')
		.isLength({ min: 5 })
		.withMessage('El campo bio debe tener al menos 5 caracteres'),
	body('skills')
		.isLength({ min: 5 })
		.withMessage('El campo skills debe tener al menos 5 caracteres'),
	body('experience')
		.isLength({ min: 5 })
		.withMessage('El campo experience debe tener al menos 5 caracteres'),

	// Controlador
	(req, res) => {
		// Verificar errores de validación
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		// Si no hay errores, llamamos al controlador
		updateAbout(req, res);
	},
);

module.exports = router;
