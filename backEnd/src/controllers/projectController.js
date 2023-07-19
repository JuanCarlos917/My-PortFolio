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
		const projects = await Project.findAll({
			include: [Category, TeamDev, Tag],
			// include: [Category, TeamDev, Tag],
		});


		if (projects.length === 0) {
            return res.status(404).json({
                message: 'No se encontraron proyectos',
			});
		}

        // if(!projects.Category){
        //     return res.status(404).json({
		// 		message: 'Recueda agregar las categorias',
		// 	});
        // }

        // if(!projects.Tag){
        //     return res.status(404).json({
        //         message: 'Recueda agregar las etiquetas',
        //     })
        // }

		//Devolver la información de los proyectos al cliente
		res.json(projects);
	} catch (error) {
		//Registrar el error detallado en el servidor
		console.error(error);

		//Devolver un mensaje de error genérico al cliente
		res.status(500).json({
			message: 'Ha ocurrido un error al obtener los proyectos',
		});
	}
};


// Controlador para crear un nuevo proyecto y agregarlo a la base de datos
const createProject = async (req, res) => {
    try {
		// Extraer las propiedades necesarias del cuerpo de la petición
		const { title, description, technologies, image, url, teamDevs } =
			req.body;

		// Verificar si se han proporcionado teamDevs y si hay al menos uno
		if (!teamDevs || teamDevs.length === 0) {
			// Si no, responder con un mensaje de error
			return res.status(400).json({
				message:
					'Debe haber al menos un TeamDev asociado con el proyecto.',
			});
		}

		// Verificar que todos los teamDevs proporcionados existen en la base de datos
		const foundTeamDevs = await TeamDev.findAll({
			where: {
				id: teamDevs,
			},
		});

		// Si no se encontraron todos los teamDevs proporcionados, responder con un mensaje de error
		if (foundTeamDevs.length !== teamDevs.length) {
			return res.status(400).json({
				message:
					'Algunos TeamDevs proporcionados no existen en la base de datos.',
			});
		}

		// Crear el nuevo proyecto con los datos proporcionados
		let newProject = await Project.create({
			title,
			description,
			technologies,
			image,
			url,
		});

		// Asociar los teamDevs encontrados con el nuevo proyecto
		await newProject.addTeamDevs(foundTeamDevs);

		// Recuperar el nuevo proyecto de la base de datos, incluyendo los teamDevs asociados
		newProject = await Project.findOne({
			where: { id: newProject.id },
			include: [
				{
					model: TeamDev,
					through: {
						attributes: { exclude: ['createdAt', 'updatedAt'] },
					},
				},
			],
		});

		// Enviar el nuevo proyecto como respuesta
		res.json(newProject);
	} catch (error) {
        // Si algo sale mal, imprimir el error y enviar un mensaje de error como respuesta
        console.error(error);
        res.status(500).json({
            message: 'Ha ocurrido un error al crear el proyecto.',
        });
    }
};








module.exports = {
	getProjects,
	createProject,
};
