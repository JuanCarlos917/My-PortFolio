const express = require('express');
const router = express();
const { contactMe,  } = require('../controllers/contactMeController');
const {
	contacMeValidations,
	handleValidationErrors,
} = require('../utils/contacMeValidations');

// Rutas para enviar email de contactame
router.post('/', contacMeValidations, handleValidationErrors, contactMe);


module.exports = router;
