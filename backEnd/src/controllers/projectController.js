const { Project, TeamDev, Category, Tag } = require('../db');
const winston = require('winston');
const Joi = require('joi');

//controlador para obtener los datos de educación
const getProjects = async (req, res) => {
	try {
		//Validar el objeto de solicitud
		if (!req) {
			throw new Error('Invalid request object');
		}

		//Buscar la información de los proyectos
		const projetcs = await Project.findOne({
			include: [Category, TeamDev, Tag],
		});
		if (!projetcs) {
			return res.status(404).json({
				message: 'No se encontraron proyectos',
			});
		}
		if (!projetcs.Category) {
			return res.status(404).json({
				message:
					'No se encontró información de "Category". Debes crear una "Category" primero',
			});
		}
		// if (projetcs.TeamDev.length === 0) {
		// 	return res.status(404).json({
		// 		message:
		// 			'No se encontró información de "TeamDev". Debes crear un "TeamDev" primero',
		// 	});
		// }
		// if (projetcs.Tag.length === 0) {
		// 	return res.status(404).json({
		// 		message:
		// 			'No se encontró información de "Tag". Debes crear un "Tag" primero',
		// 	});
		// }

		//Devolver la información de los proyectos al cliente
		res.json(projetcs);
	} catch (error) {
		//Registrar el error detallado en el servidor
		console.error(error);

		//Devolver un mensaje de error genérico al cliente
		res.status(500).json({
			message: 'Ha ocurrido un error al obtener los proyectos',
		});
	}
};

//controlador para crear los datos de los proyectos
const createProject = async (req, res) => {
	try {
		//Extrae los campos necesarios del cuerpo de la solicitud
		const { title, description, technologies, image, url } = req.body;
		// Validar que todos los campos requeridos estén presentes en el cuerpo de la solicitud

		//Crea un nuevo registro de proyecto utilizando el modelo de la base de datos
		const newProject = await Project.create({
			title,
			description,
			technologies,
			image,
			url,
		});

		res.json(newProject);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Ha ocurrido un error al crear el proyecto',
		});
	}
};

module.exports = {
	getProjects,
	createProject,
};
