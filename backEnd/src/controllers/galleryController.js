const { Gallery } = require('../index');
const winston = require('winston');
const Joi = require('joi');

//controlador para obtener los datos de gallery
const getGallery = async (req, res) => {
	try {
		// Validar el objeto de solicitud
		if (!req) {
			throw new Error('Invalid request object');
		}
		// Buscar la información de gallery
		const gallery = await Gallery.findAll();
		//si no existe gallery se genera un 404
		if (gallery.length === 0) {
			return res.status(404).json({
				message: 'No se encontró la galería',
			});
		}
		// Devolver la información de gallery al cliente
		res.json(gallery);
	} catch (error) {
		// Registrar el error detallado en el servidor
		winston.error(error);
		res.status(500).json({
			message: 'Ha ocurrido un error al obtener la galería',
		});
	}
};

// controlador para crear los datos de gallery
const createGallery = async (req, res) => {
	try {
		// Extrae los campos necesarios del cuerpo de la solicitud
		const { title, description, images } = req.body;
		// Crea un nuevo registro de gallery utilizando el modelo de la base de datos
		const newGallery = await Gallery.create({
			images,
			description,
			title,
		});
		// Envía la respuesta JSON con los datos de la nueva gallery creada
		res.json({
			message: 'La galería ha sido creada correctamente.',
			gallery: newGallery,
		});
	} catch (error) {
		// Registrar el error detallado en el servidor
		winston.error(error);
		// Devolver un mensaje de error genérico al cliente
		res.status(500).json({
			message: 'Ha ocurrido un error al crear la galería',
		});
	}
};

// Declaramos la función asíncrona 'updateGallery'
const updateGallery = async (req, res) => {
	try {
		// Extraemos el ID de la galeria de los parámetros de la ruta
		const { id } = req.params;

		// Extraemos los campos del cuerpo de la solicitud
		const { title, description, images } = req.body;

		// Busca una galeria existente en la base de datos
		let existingGallery = await Gallery.findOne({ where: { id } });

		// Si no se encuentra ninguna galeria, devuelve un estado 400
		// y un mensaje indicando que la galeria no fue encontrada
		if (!existingGallery) {
			return res.status(400).json({
				message:
					'No se encontró un registro de la galeria existente para modificar. Por favor, asegúrate de que el ID de la galeria proporcionado es correcto y que el registro de la galeria ya existe en la base de datos.',
			});
		}

		// Si la galeria existe, actualizamos la galeria con los nuevos datos
		await Gallery.update(
			{
				title,
				description,
				images,
			},
			{
				where: { id },
			},
		);

		// Recuperamos los datos actualizados de la galeria de la base de datos
		const updatedGallery = await Gallery.findOne({ where: { id } });

		// Respondemos con un mensaje de éxito y los datos actualizados de la galeria
		return res.status(200).json({
			message: 'Se modifico correctamente los datos de la galeria.',
			galleryUpdated: updatedGallery,
		});
	} catch (error) {
		// En caso de error, lo registramos y respondemos con un mensaje de error
		winston.error(error);
		res.status(500).json({
			message: 'Ha ocurrido un error al actualizar la galería',
		});
	}
};


// controlador para eliminar los datos de gallery
const deleteGallery = async (req, res) => {
    try {
		const { id } = req.params;
		// Verificar si el ID es válido
		if (!isValidId(id)) {
			return res.status(400).json({
				message: 'ID inválido.',
			});
		}

		// Buscar el registro de gallery a eliminar
		const existingGallery = await Gallery.findOne({
			where: { id },
		});

		// Obtener el titulo de la galeria si existe, o asignar null
		const educationTitle = existingGallery ? existingGallery.title : null;

        //Verificar si el registro de galeria existe
        if (!existingGallery) {
            return res.status(404).json({
                message: 'No se encontró la galería.',
            });
        }

        // Eliminar el registro de galeria
        await Gallery.destroy({
            where: { id },
        });
       res.json({
			message: `Galeria eliminada exitosamente - ${educationTitle}`,
		});
	} catch (error) {
		// Registrar el error utilizando la biblioteca de registro (winston)
		winston.error(error);

		// Enviar una respuesta de error con un mensaje genérico
		res.status(500).json({
			message: 'Ha ocurrido un error al eliminar la Galeria.',
		});
	}
}
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
    getGallery,
    createGallery,
    updateGallery,
    deleteGallery,
};

