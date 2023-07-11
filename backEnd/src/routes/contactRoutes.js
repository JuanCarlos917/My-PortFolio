const express = require('express');
const router = express();
const {
	getContact,
	createContact,
	updateContact,
	deleteContact,
} = require('../controllers/contactController');

const { createContactValidations, handleValidationErrors } = require('../utils/ContactValidations')
	// Ruta para obtener todos los datos de contacto
	router.get('/', getContact);
// Rutas para crear un nuevo registro en la base de datos y actualizar uno existente
router.post('/', createContactValidations, handleValidationErrors, createContact);
router.put('/:id', updateContact);
// Ruta para eliminar un registro de la base de datos
router.delete('/:id', deleteContact);

module.exports = router;