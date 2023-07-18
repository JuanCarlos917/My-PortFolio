const { Education, CV } = require('../db');
const winston = require('winston');
const Joi = require('joi');

//controlador para obtener los datos de educación
const getEducation = async (req, res, next) => {
	try {
		// Validar el objeto de solicitud
		if (!req) {
			throw new Error('Invalid request object');
		}

		// Buscar la información de educación
		const education = await Education.findAll();
		if (education.length === 0) {
			return res.status(404).json({
				message: 'No se encontró la Educación',
			});
		}

		// Devolver la información de educación al cliente
		res.json(education);
	} catch (error) {
		// Registrar el error detallado en el servidor
		winston.error(error);

		// Devolver un mensaje de error genérico al cliente
		res.status(500).json({
			message: 'Ha ocurrido un error al obtener la Educación',
		});
	}
};

// controlador para crear los datos de educación
const createEducation = async (req, res, next) => {
	try {
		// Extrae los campos necesarios del cuerpo de la solicitud
		const {
			degree,
			description,
			institution,
			field_of_study,
			startDate,
			endDate,
			CVId,
		} = req.body;
		// Obtener la información de "CV"
		const cv = await CV.findOne();
		if (!cv) {
			// Si no se encuentra información de "CV", responder con estado 404 y un mensaje de error
			return res.status(404).json({
				message:
					'No se encontró información de "CV". Se debe agregar primero un "CV"',
			});
		}

		// Crea un nuevo registro de educación utilizando el modelo de la base de datos
		const newEducation = await Education.create({
			degree,
			description,
			institution,
			field_of_study,
			startDate,
			endDate,
			CVId: cv.id,
		});

		// Envía la respuesta JSON con los datos de la nueva educación creada
		res.json({
			message: 'La Educación ha sido creada correctamente.',
			education: newEducation,
		});
	} catch (error) {
		// Registra el error utilizando la biblioteca de registro (winston)
		winston.error(error);

		// Envía una respuesta de estado 500 con un mensaje de error genérico
		res.status(500).json({
			message: 'Ha ocurrido un error en la creación de la Educación.',
		});
	}
};

//controlador para modificar los datos de educación
const updateEducation = async (req, res) => {
	try {
		// Extrae los datos de la educación del cuerpo de la solicitud
		const { id } = req.params;
		// Extraemos los campos del cuerpo de la solicitud
		const {
			degree,
			description,
			institution,
			field_of_study,
			startDate,
			endDate,
		} = req.body;

		// Busca una educación existente en la base de datos
		let existingEducation = await Education.findOne({ where: { id } });

		// Si no se encuentra ninguna educación, devuelve un estado 400
		if (!existingEducation) {
			return res.status(400).json({
				message:
					'No se encontró un registro de educación existente para modificar. Por favor, asegúrate de que el ID de la educación proporcionado es correcto y que el registro de educación ya existe en la base de datos.',
			});
		}
		// Si se actualiza el registro correctamente, se envía un mensaje de éxito y los datos de la educación actualizada
		await Education.update(
			{
				degree,
				description,
				institution,
				field_of_study,
				startDate,
				endDate,
			},
			{ where: { id } },
		);
		// Recuperamos los datos actualizados de la educacion de la base de datos
		const updatedEducation = await Education.findOne({ where: { id } });
		// Respondemos con un mensaje de éxito y los datos actualizados del contacto
		return res.status(200).json({
			message: 'Se modifico correctamente los datos de contacto.',
			educationUpdated: updatedEducation,
		});
	} catch (error) {
		// Registra el error utilizando la biblioteca de registro (winston)
		console.error(error);

		// Envía una respuesta de estado 500 con un mensaje de error genérico
		res.status(500).json({
			message: 'Ha ocurrido un error al modificar la Educación.',
		});
	}
};

//controlador para eliminar los datos de educación
const deleteEducation = async (req, res) => {
	try {
		const { id } = req.params;

		// Validate the 'id' parameter
		if (!isValidId(id)) {
			return res.status(400).json({
				message: 'ID inválido.',
			});
		}

		// Buscar el registro de educación existente
		const existingEducation = await Education.findOne({
			where: { id },
		});

		// Obtener el nombre de la educación si existe, o asignar null
		const educationName = existingEducation
			? existingEducation.degree
			: null;

		// Verificar si el registro de educación existe
		if (!existingEducation) {
			return res.status(400).json({
				message: 'La Educación no existe.',
			});
		}

		// Eliminar el registro de educación
		await Education.destroy({ where: { id } });

		// Enviar una respuesta exitosa con el mensaje de eliminación
		res.json({
			message: `La Educación de ${educationName} con ID ${id} ha sido eliminada.`,
		});
	} catch (error) {
		// Registrar el error utilizando la biblioteca de registro (winston)
		winston.error(error);

		// Enviar una respuesta de error con un mensaje genérico
		res.status(500).json({
			message: 'Ha ocurrido un error al eliminar la Educación.',
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
	getEducation,
	createEducation,
	updateEducation,
	deleteEducation,
};
