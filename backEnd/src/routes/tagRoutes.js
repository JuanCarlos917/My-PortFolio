const express = require('express');
const router = express();
const {
	getTags,
	createTag,
	deleteTag,
	updateTag,
} = require('../controllers/tagController');

// Ruta para obtener la información de Tags
router.get('/', getTags)
// Rutas para crear y actualizar el contenido de Tags
router.post('/', createTag);
// Ruta para eliminar la información de Tags
router.delete('/:id', deleteTag);
// Ruta para actualizar la información de Tags
router.put('/:id', updateTag);

module.exports = router;
