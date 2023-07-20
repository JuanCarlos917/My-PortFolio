const express = require('express');
const router = express();
const {
	getCategories,
	createCategory,
	deleteCategory,
	updateCategory,
} = require('../controllers/categoryController');
const {
	createCategoryValidations,
	handleValidationErrors,
} = require('../utils/categoryValidations');

// Ruta para obtener todas las categorías
router.get('/', getCategories);

// Ruta para crear una categoría.createCategoryValidations, handleValidationErrors son validaciones de express-validator
router.post(
	'/',
	createCategoryValidations,
	handleValidationErrors,
	createCategory,
);

// Ruta para eliminar una categoría. handleValidationErrors es una validacion de express-validator
router.delete(
	'/:id',
	handleValidationErrors,
	deleteCategory,
);

// Ruta para actualizar una categoría. handleValidationErrors es una validacion de express-validator
router.put(
    '/:id',
    handleValidationErrors,
    updateCategory,
);

module.exports = router;
