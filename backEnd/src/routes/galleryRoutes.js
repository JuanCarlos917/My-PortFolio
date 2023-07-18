const express = require('express');
const router = express();
const {
	getGallery,
	createGallery,
	updateGallery,
	deleteGallery,
} = require('../controllers/galleryController');
const {
	updateGalleryValidations,
	handleValidationErrors,
} = require('../utils/galleryValidations');

// Ruta para obtener la información de gallery
router.get('/', getGallery);
// Rutas para crear y actualizar el contenido de gallery
router.post(
	'/',
	updateGalleryValidations,
	handleValidationErrors,
	createGallery,
);
router.put(
	'/:id',
	updateGalleryValidations,
	handleValidationErrors,
	updateGallery,
);
// Ruta para eliminar la información de gallery
router.delete('/:id', deleteGallery);
module.exports = router;