const express = require('express');
const router = express();
const {
	getAbout,
	updateAbout,
	createAbout,
} = require('../controllers/aboutController');
const {
	updateAboutValidations,
	handleValidationErrors,
} = require('../utils/aboutValidations');

// Ruta para obtener la información de "Acerca de mí"
router.get('/', getAbout);
// Rutas para crear y actualizar el contenido del apartado acerca de
router.post('/', updateAboutValidations, handleValidationErrors, createAbout);
// Ruta para actualizar la información de "Acerca de mí". handleValidationErrors, updateAbout son validaciones de express-validator
router.put('/', updateAboutValidations, handleValidationErrors, updateAbout);

module.exports = router;
