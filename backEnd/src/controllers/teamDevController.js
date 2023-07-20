const { TeamDev, Project } = require('../db');

//controlador para obtener el equipo de desarrolladores del proyecti desde la base de datos
const getTeamDevs = async (req, res) => {
	try {
		const teamDevs = await TeamDev.findAll();

		if (teamDevs.length === 0) {
			return res.status(404).json({
				message: 'No se encontraron teamDevs.',
			});
		}

		res.json(teamDevs);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Ha ocurrido un error al obtener los teamDevs.',
		});
	}
};

//controlador para crear un nuevo teamDev y agregarlo a la base de datos
const createTeamDev = async (req, res) => {
	try {
		const { name, email, social_network } = req.body;

		if (!name || !email || !social_network) {
			return res.status(400).json({
				message:
					'El nombre, el email y la red social del teamDev no pueden estar vacíos.',
			});
		}

		const existingTeamDev = await TeamDev.findOne({ where: { name } });

		if (existingTeamDev) {
			return res.status(400).json({
				message: 'El teamDev ya existe.',
			});
		}

		const newTeamDev = await TeamDev.create({
			name,
			email,
			social_network,

		});
		res.json(newTeamDev);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Ha ocurrido un error al crear el teamDev.',
		});
	}
};

//controller para modificar el teamDev
const updateTeamDev = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, email, social_network } = req.body;
		let updatedFields = {};

		//validar si se enviaron campos a actualizar en la peticion
		if (name) updatedFields.name = name;
		if (email) updatedFields.email = email;
		if (social_network) updatedFields.social_network = social_network;

		//actualizamos los datos del usuario con las nuevas propiedades
		const updatedTeamDev = await TeamDev.update(updatedFields, {
			where: { id },
		});
		//si el usuario existe, se envia una respuesta
		if (updatedTeamDev) {
			res.json({
				message: 'El teamDev ha sido actualizado.',
			});
		} else {
			res.status(404).json({
				message: 'El teamDev no existe.',
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Ha ocurrido un error al actualizar el teamDev.',
		});
	}
};

//controller para eliminar el teamDev
const deleteTeamDev = async (req, res) => {
	try {
		const { id } = req.params;
		const teamDev = await TeamDev.findOne({ where: { id } });
		const teamDevName = teamDev ? teamDev.name : null;

		if (teamDev) {
			await teamDev.destroy();
			res.json({
				message: `El teamDev ${teamDevName} con ID ${id} ha sido eliminado.`,
			});
		} else {
			res.status(404).json({
				message: 'El teamDev no existe.',
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Ha ocurrido un error al eliminar el teamDev.',
		});
	}
};

module.exports = {
	getTeamDevs,
	createTeamDev,
	deleteTeamDev,
	updateTeamDev,
};
