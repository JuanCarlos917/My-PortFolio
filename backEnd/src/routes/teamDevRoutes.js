const express = require('express');
const router = express();
const {getTeamDevs,
	createTeamDev,
	deleteTeamDev,
	updateTeamDev,} = require('../controllers/teamDevController')

// Ruta para obtener todos los teamDevs
router.get('/', getTeamDevs);

//Rutas de Team Devs CRUD
router.post('/', createTeamDev);
router.put('/:id', updateTeamDev);
router.delete('/:id', deleteTeamDev);

module.exports = router;