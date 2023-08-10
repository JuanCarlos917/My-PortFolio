const express = require('express');
const router = express();
const {
	getProfessionalExp,
	createProfessionalExp,
	updateProfessionalExp,
	deleteProfessionalExp,
} = require ('../controllers/professionalExpController')
const {
	profesionalExpValidations,
	handleValidationErrors,
} = require('../utils/profesionalExpValidations');

// Ruta para obtener la información de experiencia profesional
router.get('/', getProfessionalExp);

// Rutas para crear y actualizar el contenido de experiencia profesional
router.post(
	'/',
	profesionalExpValidations,
	handleValidationErrors,
	createProfessionalExp,
);

// Ruta para actualizar la información de experiencia profesional
router.put(
	'/:id',
	profesionalExpValidations,
	handleValidationErrors,
	updateProfessionalExp,
);

// Ruta para eliminar la información de experiencia profesional
router.delete('/:id', deleteProfessionalExp);

module.exports = router;