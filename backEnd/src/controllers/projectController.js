const { Project, TeamDev, Category, Tag } = require('../db');
const winston = require('winston');
const Joi = require('joi');

// Esta es una función asincrónica que se encarga de obtener los proyectos
const getProjects = async (req, res) => {
	try {
		// Se valida el objeto de solicitud; si no existe, se lanza un error
		if (!req) {
			throw new Error('Invalid request object');
		}

		// Aquí se busca la información de los proyectos a través de una consulta de Sequelize
		const projects = await Project.findAll({
			include: [
				{
					// Se incluye el modelo Category en la consulta
					model: Category,
					through: {
						// La propiedad attributes con un array vacío ([]), excluye los atributos de la tabla de unión en el resultado
						attributes: [],
					},
				},
				{
					// Se incluye el modelo TeamDev en la consulta
					model: TeamDev,
					through: {
						// La propiedad attributes con un array vacío ([]), excluye los atributos de la tabla de unión en el resultado
						attributes: [],
					},
				},
				{
					// Se incluye el modelo Tag en la consulta
					model: Tag,
					through: {
						// La propiedad attributes con un array vacío ([]), excluye los atributos de la tabla de unión en el resultado
						attributes: [],
					},
				},
			],
		});

		// Si no se encontraron proyectos, se devuelve un error 404 con un mensaje
		if (projects.length === 0) {
			return res.status(404).json({
				message: 'No se encontraron proyectos',
			});
		}
		// Si se encontraron proyectos, se devuelven al cliente en formato JSON
		res.json(projects);
	} catch (error) {
		// En caso de error, se registra el error detallado en el servidor
		console.error(error);

		// Y se devuelve un mensaje de error genérico al cliente
		res.status(500).json({
			message: 'Ha ocurrido un error al obtener los proyectos',
		});
	}
};

// Este controlador crea un nuevo proyecto y lo agrega a la base de datos.
const createProject = async (req, res) => {
	try {
		// Se extraen las propiedades necesarias del cuerpo de la solicitud.
		// El objeto `req.body` debe incluir `title`, `description`, `technologies`, `image`, `url`, `teamDevs`, `categories`, `tags`
		// `teamDevs`, `categories` y `tags` son listas de identificadores que representan las relaciones del proyecto con
		// los desarrolladores del equipo, las categorías y las etiquetas respectivamente.
		// Estos son necesarios porque un proyecto en este contexto se considera incompleto sin estas relaciones.
		const {
			title,
			description,
			technologies,
			image,
			url,
			teamDevs,
			categories,
			tags,
		} = req.body;

		// Se verifica si se proporcionaron teamDevs y si hay al menos uno.
		if (!teamDevs || teamDevs.length === 0) {
			// Si no se proporcionaron, se responde con un mensaje de error.
			return res.status(400).json({
				message:
					'Debe haber al menos un TeamDev asociado con el proyecto.',
			});
		}

		// Se verifica que todos los teamDevs proporcionados existen en la base de datos.
		const foundTeamDevs = await TeamDev.findAll({
			where: {
				id: teamDevs,
			},
		});

		// Si no se encontraron todos los teamDevs proporcionados, se responde con un mensaje de error.
		if (foundTeamDevs.length !== teamDevs.length) {
			return res.status(400).json({
				message:
					'Algunos TeamDevs proporcionados no existen en la base de datos.',
			});
		}

		// Se verifica si se proporcionaron categorías y si hay al menos una.
		if (!categories || categories.length === 0) {
			return res.status(400).json({
				message:
					'Debe haber al menos una categoría asociada al proyecto',
			});
		}

		// Se verifica que todas las categorías proporcionadas existen en la base de datos.
		const foundCategory = await Category.findAll({
			where: {
				id: categories,
			},
		});

		// Si no se encontraron todas las categorías proporcionadas, se responde con un mensaje de error.
		if (foundCategory.length !== categories.length) {
			return res.status(400).json({
				message:
					'Algunas categorías proporcionadas no existen en la base de datos',
			});
		}

		// Se verifica si se proporcionaron etiquetas y si hay al menos una.
		if (!tags || tags.length === 0) {
			return res.status(400).json({
				message:
					'Debe haber al menos una etiqueta asociada al proyecto',
			});
		}

		// Se verifica que todas las etiquetas proporcionadas existen en la base de datos.
		const foundTag = await Tag.findAll({
			where: {
				id: tags,
			},
		});

		// Si no se encontraron todas las etiquetas proporcionadas, se responde con un mensaje de error.
		if (foundTag.length !== tags.length) {
			return res.status(400).json({
				message:
					'Algunas etiquetas proporcionadas no existen en la base de datos',
			});
		}

		// Se crea el nuevo proyecto con los datos proporcionados.
		let newProject = await Project.create({
			title,
			description,
			technologies,
			image,
			url,
		});

		// Se asocian los teamDevs encontrados con el nuevo proyecto.
		await newProject.addTeamDevs(foundTeamDevs);

		// Se asocian las categorías encontradas con el nuevo proyecto.
		await newProject.addCategories(foundCategory);

		// Se asocian las etiquetas encontradas con el nuevo proyecto.
		await newProject.addTags(foundTag);

		// Se recupera el nuevo proyecto de la base de datos, incluyendo los teamDevs, categorías y etiquetas asociados.
		newProject = await Project.findOne({
			where: { id: newProject.id },
			include: [
				{
					model: TeamDev,
					through: {
						attributes: [],
					},
				},
				{
					model: Category,
					through: {
						attributes: [],
					},
				},
				{
					model: Tag,
					through: {
						attributes: [],
					},
				},
			],
		});

		// Se envía el nuevo proyecto como respuesta.
		res.json(newProject);
	} catch (error) {
		// Si algo sale mal, se imprime el error y se envía un mensaje de error como respuesta.
		console.error(error);
		res.status(500).json({
			message: 'Ha ocurrido un error al crear el proyecto.',
		});
	}
};

//controlador para modificar los datos del pryecto, de las categorias, de los tags y del teamDev
const updateProject = async (req, res) => {
	try {
		// Extrae el ID del proyecto de los parámetros de la solicitud
		const { id } = req.params;
		// Extrae los campos del proyecto del cuerpo de la solicitud
		const {
			title,
			description,
			technologies,
			image,
			url,
			teamDevs,
			categories,
			tags,
		} = req.body;

		// Si los campos teamDevs, categories o tags no están presentes en el cuerpo de la solicitud,
		// lanza un error.
		if (!teamDevs || !categories || !tags) {
			throw new Error('El cuerpo de la solicitud debe contener teamDevs, categories y tags.');
		}

		// Busca en la base de datos si existe un proyecto con el ID proporcionado.
		const existingProject = await Project.findOne({ where: { id } });

		// Si el proyecto no existe en la base de datos, retorna un error.
		if (!existingProject) {
			return res.status(404).json({
				message: `No se encontró el proyecto con ID ${id} para modificar. Asegúrate de que el ID del proyecto proporcionado sea correcto y que el registro del proyecto ya exista en la base de datos.`,
			});
		}

		// Si el proyecto existe, actualiza sus campos con los valores proporcionados en el cuerpo de la solicitud.
		await existingProject.update({
			title,
			description,
			technologies,
			image,
			url,
		});

		// Obtiene la lista de teamDevs asociados al proyecto existente
		const existingTeamDevs = await existingProject.getTeamDevs();
		// Extrae los IDs de los teamDevs existentes
		const existingTeamDevIds = existingTeamDevs.map((teamDev) => teamDev.id);
		// Determina qué teamDevs deben ser añadidos y cuáles eliminados
		const teamDevsToAdd = teamDevs.filter((teamDevId) => !existingTeamDevIds.includes(teamDevId));
		const teamDevsToRemove = existingTeamDevIds.filter((teamDevId) => !teamDevs.includes(teamDevId));
		// Añade y elimina los teamDevs correspondientes
		await existingProject.addTeamDevs(teamDevsToAdd);
		await existingProject.removeTeamDevs(teamDevsToRemove);

		// El mismo proceso se repite para las categorías y tags
		const existingCategories = await existingProject.getCategories();
		const existingCategoryIds = existingCategories.map((category) => category.id);
		const categoriesToAdd = categories.filter((categoryId) => !existingCategoryIds.includes(categoryId));
		const categoriesToRemove = existingCategoryIds.filter((categoryId) => !categories.includes(categoryId));
		await existingProject.addCategories(categoriesToAdd);
		await existingProject.removeCategories(categoriesToRemove);

		const existingTags = await existingProject.getTags();
		const existingTagIds = existingTags.map((tag) => tag.id);
		const tagsToAdd = tags.filter((tagId) => !existingTagIds.includes(tagId));
		const tagsToRemove = existingTagIds.filter((tagId) => !tags.includes(tagId));
		await existingProject.addTags(tagsToAdd);
		await existingProject.removeTags(tagsToRemove);

		// Busca el proyecto actualizado en la base de datos, incluyendo sus asociaciones.
		const updatedProject = await Project.findOne({
			where: { id },
			include: [
				{ model: TeamDev, through: { attributes: [] } },
				{ model: Category, through: { attributes: [] } },
				{ model: Tag, through: { attributes: [] } },
			],
		});

		// Si el proyecto actualizado no existe, retorna un error.
		if (!updatedProject) {
			return res.status(404).json({
				message: `El proyecto con ID ${id} no se encontró después de la actualización.`,
			});
		}

		// Si el proyecto se actualizó correctamente, envía una respuesta con el proyecto actualizado y un mensaje de éxito.
		res.json({
			message: `El proyecto con ID ${id} se actualizó correctamente.`,
			updatedProject: updatedProject,
		});
	} catch (error) {
		// Si ocurre algún error durante el proceso, lo registra y envía una respuesta con un mensaje de error.
		console.error(error);
		res.status(500).json({
			message: `Error al actualizar el proyecto.`,
		});
	}
};

const deleteProject = async (req, res) => {
    try {
        // Extrae el ID del proyecto de los parámetros de la solicitud
        const { id } = req.params;

        // Busca en la base de datos si existe un proyecto con el ID proporcionado.
        const existingProject = await Project.findOne({ where: { id } });

        // Si el proyecto no existe en la base de datos, retorna un error.
        if (!existingProject) {
            return res.status(404).json({
                message: `No se encontró el proyecto con ID ${id} para eliminar. Asegúrate de que el ID del proyecto proporcionado sea correcto y que el registro del proyecto ya exista en la base de datos.`,
            });
        }

        // Si el proyecto existe, lo elimina de la base de datos.
        await existingProject.destroy();

        // Envía una respuesta con un mensaje de éxito.
        res.json({
            message: `El proyecto con ID ${id} se eliminó correctamente.`,
        });
    } catch (error) {
        // Si ocurre algún error durante el proceso, lo registra y envía una respuesta con un mensaje de error.
        console.error(error);
        res.status(500).json({
            message: `Error al eliminar el proyecto.`,
        });
    }
}




module.exports = {
	getProjects,
	createProject,
	updateProject,
	deleteProject,
};
