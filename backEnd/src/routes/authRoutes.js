const express = require('express');
const router = express.Router();
const {
	registerUser,
	loginUser,
	logoutUser,
	forgotPassword,
} = require('../controllers/authController');
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
// Ruta para cerrar sesión de un usuario
router.get('/logout', logoutUser);
// Ruta para solicitar un token de reseteo de contraseña
router.post('/forgot-password', forgotPassword);

module.exports = router;
