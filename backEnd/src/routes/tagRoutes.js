const express = require('express');
const router = express();
const {
    getTags,
    createTag,
    deleteTag
} = require('../controllers/tagController')

// Ruta para obtener la información de Tags
router.get('/', getTags)
// Rutas para crear y actualizar el contenido de Tags
router.post('/', createTag);
// Ruta para eliminar la información de Tags
router.delete('/:id', deleteTag);

module.exports = router;
