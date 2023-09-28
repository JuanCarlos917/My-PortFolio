const express = require('express')
const router = express.Router()
const {
	getServices,
	createService,
	updateService,
	deleteService,
} = require('../controllers/servicesController');
const { serviceValidations, handleValidationErrors } = require('../utils/serviceValidations')

// Ruta para obtener los servicios
router.get('/', getServices)
// Ruta para crear un servicio
router.post('/', serviceValidations, handleValidationErrors, createService);
// Ruta para actualizar un servicio
router.put('/:id', serviceValidations, handleValidationErrors, updateService);
// Ruta para eliminar un servicio
router.delete('/:id', deleteService)

module.exports = router;