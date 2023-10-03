const express = require('express');
const router = express.Router();
const {
	getAllStarRating,
	createStarRating,
	updateStarRating,
	deleteStarRating,
} = require('../controllers/starRatingController');
const { starRatingValidations, handleValidationErrors } = require('../utils/starRatingValidations');

// Ruta para obtener las estrellas y comentarios
router.get('/', getAllStarRating);
// Ruta para crear las estrellas y comentarios
router.post('/', starRatingValidations, handleValidationErrors, createStarRating);
// Ruta para actualizar las estrellas y comentarios
router.put('/:id', starRatingValidations, handleValidationErrors, updateStarRating);
// Ruta para eliminar las estrellas y comentarios
router.delete('/:id', deleteStarRating);

module.exports = router;
