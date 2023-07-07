const express = require('express');
const router = express();
const { getAbout, updateAbout } = require('../controllers/AboutController');
const {
	updateAboutValidations,
	handleValidationErrors,
} = require('../utils/aboutValidations');

// Ruta para obtener la información de "Acerca de mí"
router.get('/', getAbout);

// Ruta para actualizar la información de "Acerca de mí". handleValidationErrors, updateAbout son validaciones de express-validator
router.put('/', updateAboutValidations, handleValidationErrors, updateAbout);

module.exports = router;
