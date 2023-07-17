const express = require('express');
const router = express();
const {
	getEducation,
	createEducation,
	updateEducation,
	deleteEducation,
} = require('../controllers/educationController');
const {
    updateEducationValidations,
    handleValidationErrors,
} = require('../utils/educationValidations');

// Ruta para obtener la información de Educación
router.get('/', getEducation);
// Rutas para crear y actualizar el contenido de Educación
router.post(
    '/',
    updateEducationValidations,
    handleValidationErrors,
    createEducation
);
// Ruta para actualizar la información de Educación
router.put(
    '/',
    updateEducationValidations,
    handleValidationErrors,
    updateEducation
);
// Ruta para eliminar la información de Educación
router.delete('/:id', deleteEducation);

module.exports = router;