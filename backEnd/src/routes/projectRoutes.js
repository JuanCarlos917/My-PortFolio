const express = require('express');
const router = express();
const {
	getProjects,
	createProject,
	updateProject,
	deleteProject,
	getProjectById,
} = require('../controllers/projectController');

const {
	projectValidations,
	handleValidationErrors,
} = require('../utils/projectValidations');

// Ruta para obtener la información de proyectos
router.get('/', getProjects);
// Rutas para crear y actualizar el contenido de proyectos
router.post('/', projectValidations, handleValidationErrors, createProject);
router.put('/:id', projectValidations, handleValidationErrors, updateProject);
// Ruta para eliminar la información de proyectos
router.delete('/:id', deleteProject);
// Ruta para obtener la información de un proyecto
router.get('/:id', getProjectById);


module.exports = router;