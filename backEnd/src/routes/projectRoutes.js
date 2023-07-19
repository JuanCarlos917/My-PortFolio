const express = require('express');
const router = express();
const {
   getProjects,
    createProject
} = require('../controllers/projectController')

// Ruta para obtener la información de proyectos
router.get('/', getProjects);
// Rutas para crear y actualizar el contenido de proyectos
router.post('/', createProject);

module.exports = router;