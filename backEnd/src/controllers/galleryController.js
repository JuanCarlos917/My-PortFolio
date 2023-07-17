const { Gallery } = require('../db');
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

// controlador para actualizar los datos de gallery
const updateGallery = async (req, res) => {
	try {
		// Extrae los datos de gallery del cuerpo de la solicitud
		const galleryData = req.body;
		// Busca el registro de gallery a actualizar
		const gallery = await Gallery.findOne();
		// Si no existe gallery se genera un 404
		if (!gallery) {
			gallery = await Gallery.create(galleryData);
			return res.status(201).json({
				message: 'La Galleria ha sido creada.',
				gallery,
			});
		} else {
			// Si se encuentra una galleria, actualiza el registro existente
			const [rowsUpdated, updatedGallery] = await Gallery.update(
				galleryData,
				{
					where: { id: gallery.id },
					returning: true,
				},
			);

			//si no se actualiza ningun registro, se envia un mensaje de gallery no encontrada
			if (rowsUpdated === 0) {
				return res.status(404).json({
					message: 'No se encontró la galería',
				});
			} else {
				// Si se actualiza el registro correctamente, se envía un mensaje de éxito y los datos de la educación actualizada
				const { id, title, description, images } = updatedGallery[0];

				res.status(200).json({
					message: 'La galería ha sido actualizada correctamente.',
					gallery: {
						id,
						title,
						description,
						images,
					},
				});
			}
		}
	} catch (error) {
		// Registrar el error detallado en el servidor
		winston.error(error);
		// Devolver un mensaje de error genérico al cliente
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

