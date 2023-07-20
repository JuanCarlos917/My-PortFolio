const { Tag, Project } = require('../db');
const winston = require('winston');
const Joi = require('joi');

//controlador para obtener los datos de los Tags
const getTags = async (req, res) => {
	try {
		//Validar el objeto de solicitud
		if (!req) {
			throw new Error('Invalid request object');
		}

		//Buscar la información de los Tags
		const tags = await Tag.findAll();

		if (tags.length === 0) {
			return res.status(404).json({
				message: 'No se encontraron Tags',
			});
		}

		//Devolver la información de los Tags al cliente
		res.json(tags);
	} catch (error) {
		//Registrar el error detallado en el servidor
		winston.error(error);

		//Devolver un mensaje de error genérico al cliente
		res.status(500).json({
			message: 'Ha ocurrido un error al obtener los Tags',
		});
	}
};

//controlador para crear los datos de los Tags
const createTag = async (req, res) => {
	try {
		const { name, projectId } = req.body;
		if (!name) {
			return res.status(400).json({
				message: 'El nombre del Tag no puede estar vacío',
			});
		}

		const newTag = await Tag.create({
			name,
			ProjectId: projectId,
		});

		res.json(newTag);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Ha ocurrido un error al crear el Tag',
		});
	}
};

const updateTag = async (req, res) => {
    try {
        // Extrae 'id' de los parámetros de la solicitud
        const { id } = req.params;

        // Extraemos los campos del cuerpo de la solicitud
        const { name } = req.body;

        // Busca un Tag existente en la base de datos
        const existingTag = await Tag.findOne({ where: { id } });

        // Si no se encuentra ningún Tag, devuelve un estado 400
        if (!existingTag) {
            return res.status(404).json({
                message: `No se encontró el Tag con ID ${id} existente para modificar. Asegúrate de que el ID del Tag proporcionado sea correcta y que el registro del Tag ya exista en la base de datos.`,
            });
        }
        // Intenta actualizar el Tag en la base de datos
        const tag = await Tag.update({ name }, { where: { id } });

        // Comprueba si la operación de actualización fue exitosa
        if (tag) {
            // Si fue exitosa, envía un mensaje de éxito al cliente
            res.json({
                message: `El Tag con ID ${id} se actualizó correctamente.`,
            });
        } else {
            // Si no fue exitosa, envía un mensaje de error al cliente
            res.status(404).json({
                message: `No se encontró el Tag con ID ${id}.`,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Ha ocurrido un error al actualizar el Tag',
        });
    }
}

//controlador para eliminar los datos de los Tags
const deleteTag = async (req, res) => {
	try {
		const { id } = req.params;

		// Validate the 'id' parameter
		if (!isValidId(id)) {
			return res.status(400).json({
				message: 'ID inválido.',
			});
		}
		// Buscar el registro deL Tag  existente
		const existingTag = await Tag.findOne({
			where: { id },
		});

		// Obtener el nombre de la educación si existe, o asignar null
		const tagName = existingTag ? existingTag.name : null;

		// Verificar si el registro del tag existe
		if (!existingTag) {
			return res.status(400).json({
				message: 'Tag no existe.',
			});
		}
		// Eliminar el registro del Tag
		await Tag.destroy({ where: { id } });

		// Enviar una respuesta exitosa con el mensaje de eliminación
		res.json({
			message: `El Tag de ${tagName} con ID ${id} ha sido eliminado.`,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Ha ocurrido un error al eliminar el Tag',
		});
	}
};
// Funcion para validar el parametro 'id
const isValidId = (id) => {
	// Verificar si el ID está vacío, nulo o indefinido
	if (!id || id.trim() === '') {
		return false;
	}

	// Utilizar la biblioteca 'joi' para validar UUID
	const { error } = Joi.string().uuid().validate(id);
	return !error;
};

module.exports = {
	getTags,
	createTag,
	deleteTag,
	updateTag,
};
