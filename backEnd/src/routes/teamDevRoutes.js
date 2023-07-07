const express = require('express');
const router = express();
const {
	getTeamDevs,
	createTeamDev,
	deleteTeamDev,
	updateTeamDev,
} = require('../controllers/teamDevController');

const {
	updateTeamDevValidations,
	handleValidationErrors,
} = require('../utils/teamDevValidations');

// Ruta para obtener todos los teamDevs
router.get('/', getTeamDevs);

//Rutas de Team Devs CRUD  Create, Read, Update and Delete
router.post('/', createTeamDev);
router.put(
	'/:id',
	updateTeamDevValidations,
	handleValidationErrors,
	updateTeamDev,
);
router.delete('/:id', deleteTeamDev);

module.exports = router;
