const express = require('express');
const router = express();
const {
	getProjects,
	createProject,
	updateProject,
	deleteProject,
} = require('../controllers/projectController');

// Ruta para obtener la información de proyectos
router.get('/', getProjects);
// Rutas para crear y actualizar el contenido de proyectos
router.post('/', createProject);
router.put('/:id', updateProject);
// Ruta para eliminar la información de proyectos
router.delete('/:id', deleteProject);


module.exports = router;