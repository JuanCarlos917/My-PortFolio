const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const {
	postAuthValidations,
	handleValidationErrors,
} = require('../utils/authValidations');

// Ruta para registrar un usuario
router.post(
	'/register',
	postAuthValidations,
	handleValidationErrors,
	registerUser,
);
// Ruta para iniciar sesión de un usuario
router.post('/login', postAuthValidations, handleValidationErrors, loginUser);

module.exports = router;
