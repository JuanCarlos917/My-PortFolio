const { Project, TeamDev, Category, Tag } = require('../index');
const { checkEntitiesExistence } = require('../utils/entityUtilsProjectCreate');

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

const getProjectById = async (req, res) => {

	// Se valida el objeto de solicitud; si no existe, se lanza un error
	if (!req) {
		throw new Error('Invalid request object');
	}
	// Extraemos el ID del proyecto de los parámetros de la solicitud
	const projectById = req.params.id;

	try {
		// Buscamos el proyecto en la base de datos por su ID. También incluimos información asociada.
		const project = await Project.findByPk(projectById, {
			// Incluir categorías relacionadas
			include: [
				{
					model: Category,
					through: {
						// No incluir atributos adicionales de la tabla intermedia
						attributes: [],
					},
				},
				// Incluir equipo de desarrollo relacionado
				{
					model: TeamDev,
					through: {
						attributes: [],
					},
				},
				// Incluir etiquetas relacionadas
				{
					model: Tag,
					through: {
						attributes: [],
					},
				},
			],
		});

		// Si el proyecto no se encuentra en la base de datos
		if (!project) {
			return res.status(404).json({
				message: `No se encontró el proyecto con ID ${projectById}`,
			});
		}

		// Respondemos con el proyecto encontrado
		res.json(project);
	} catch (error) {
		// En caso de error, mostramos el error y respondemos con un estado 500
		console.error(error);
		res.status(500).json({
			message: 'Ha ocurrido un error al obtener el proyecto',
		});
	}
};

// Este controlador crea un nuevo proyecto y lo agrega a la base de datos.
const createProject = async (req, res) => {
	// Bloque try para manejar posibles errores durante la ejecución.
	try {
		// Desestructuración de la solicitud para extraer propiedades específicas del cuerpo de la solicitud.
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

		// Verificar si se han proporcionado `teamDevs` y si su longitud es mayor que 0.
		if (!teamDevs || teamDevs.length === 0) {
			// En caso de no haber `teamDevs` o tener longitud 0, se envía una respuesta de error.
			return res.status(400).json({
				message: 'Debe haber al menos un TeamDev asociado con el proyecto.',
			});
		}

		// Se verifica la existencia de las entidades (TeamDevs, Categories, Tags) en la base de datos usando `checkEntitiesExistence`.
		const foundTeamDevs = await checkEntitiesExistence(TeamDev, teamDevs, 'TeamDevs');
		const foundCategories = await checkEntitiesExistence(Category, categories, 'categorías');
		const foundTags = await checkEntitiesExistence(Tag, tags, 'etiquetas');

		// Se crea un nuevo proyecto utilizando el modelo `Project`.
		let newProject = await Project.create({
			title,
			description,
			technologies,
			image,
			url,
		});

		// Se asocian las entidades encontradas con el proyecto recién creado.
		await newProject.addTeamDevs(foundTeamDevs);
		await newProject.addCategories(foundCategories);
		await newProject.addTags(foundTags);

		// Se recupera la información del proyecto con sus relaciones para devolverla en la respuesta.
		newProject = await Project.findOne({
			where: { id: newProject.id },
			include: [
				{ model: TeamDev, through: { attributes: [] } },
				{ model: Category, through: { attributes: [] } },
				{ model: Tag, through: { attributes: [] } },
			],
		});

		// Se envía el proyecto como respuesta en formato JSON.
		res.json(newProject);
	} catch (error) {
		// En caso de error, se muestra en la consola y se envía un mensaje de error al cliente.
		console.error(error);
		res.status(500).json({
			message: error.message || 'Ha ocurrido un error al crear el proyecto.',
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
			throw new Error(
				'El cuerpo de la solicitud debe contener teamDevs, categories y tags.',
			);
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
		const existingTeamDevIds = existingTeamDevs.map(
			(teamDev) => teamDev.id,
		);
		// Determina qué teamDevs deben ser añadidos y cuáles eliminados
		const teamDevsToAdd = teamDevs.filter(
			(teamDevId) => !existingTeamDevIds.includes(teamDevId),
		);
		const teamDevsToRemove = existingTeamDevIds.filter(
			(teamDevId) => !teamDevs.includes(teamDevId),
		);
		// Añade y elimina los teamDevs correspondientes
		await existingProject.addTeamDevs(teamDevsToAdd);
		await existingProject.removeTeamDevs(teamDevsToRemove);

		// El mismo proceso se repite para las categorías y tags
		const existingCategories = await existingProject.getCategories();
		const existingCategoryIds = existingCategories.map(
			(category) => category.id,
		);
		const categoriesToAdd = categories.filter(
			(categoryId) => !existingCategoryIds.includes(categoryId),
		);
		const categoriesToRemove = existingCategoryIds.filter(
			(categoryId) => !categories.includes(categoryId),
		);
		await existingProject.addCategories(categoriesToAdd);
		await existingProject.removeCategories(categoriesToRemove);

		const existingTags = await existingProject.getTags();
		const existingTagIds = existingTags.map((tag) => tag.id);
		const tagsToAdd = tags.filter(
			(tagId) => !existingTagIds.includes(tagId),
		);
		const tagsToRemove = existingTagIds.filter(
			(tagId) => !tags.includes(tagId),
		);
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
};

module.exports = {
	getProjects,
    getProjectById,
	createProject,
	updateProject,
	deleteProject,
};
