const { ProfessionalExp, CV } = require('../index');
const Joi = require('joi');

const getProfessionalExp = async (req, res) => {
	try {
		// Validar el objeto de solicitud
		if (!req) {
			throw new Error('Invalid request object');
		}

		const professionalExp = await ProfessionalExp.findAll();

		if (professionalExp.length === 0) {
			return res.status(404).json({
				message:
					'No se encontró información de Experiencia Profesional.',
			});
		}

		res.json(professionalExp);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message:
				'Ha ocurrido un error al obtener la información de Experiencia Profesional.',
		});
	}
};

const createProfessionalExp = async (req, res) => {
	try {
		const {
			company,
			position,
			startYear,
			startMonth,
			endYear,
			endMonth,
			description,
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

		const newProfessionalExp = await ProfessionalExp.create({
			company,
			position,
			startYear,
			startMonth,
			endYear,
			endMonth,
			description,
			CVId: cv.id,
		});

		res.json({
			message: 'La experiencia profesional ha sido creada correctamente',
			professionalExperience: newProfessionalExp,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message:
				'Ha ocurrido un error en la creación de la experiencia profesional',
		});
	}
};

const updateProfessionalExp = async (req, res) => {
	try {
		const { id } = req.params;

		const {
			company,
			position,
			startYear,
			startMonth,
			endYear,
			endMonth,
			description,
		} = req.body;

		const existingProfessionalExp = await ProfessionalExp.findOne({
			where: { id },
		});

		if (!existingProfessionalExp) {
			return res.status(400).json({
				message:
					'No se encontró un registro de experiencia profesional existente para modificar. Por favor, asegúrate de que el ID de experiencia profesional proporcionado es correcto y que el registro de experiencia profesional ya exista en la base de datos.',
			});
		}

		await ProfessionalExp.update(
			{
				company,
				position,
				startYear,
				startMonth,
				endYear,
				endMonth,
				description,
			},
			{ where: { id } },
		);

		const updateProfessionalExp = await ProfessionalExp.findOne({
			where: { id },
		});

		return res.status(200).json({
			message:
				'Se modifico correctamente los datos de experiencia profesional.',
			ProfessionalExpUpdated: updateProfessionalExp,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message:
				'Ha ocurrido un error al modificar la experiencia profesional',
		});
	}
};

const deleteProfessionalExp = async (req, res) => {
	try {
		const { id } = req.params;

		// Validate the 'id' parameter
		if (!isValidId(id)) {
			return res.status(400).json({
				message: 'ID inválido.',
			});
		}

		const existingProfessionalExp = await ProfessionalExp.findOne({
			where: { id },
		});

		const professionalExpName = existingProfessionalExp
			? existingProfessionalExp.company
			: null;

		if (!existingProfessionalExp) {
			return res.status(400).json({
				message: 'La experiencia profesional no existe.',
			});
		}

		await ProfessionalExp.destroy({ where: { id } });

		res.json({
			message: `La experiencia profecional de ${professionalExpName} con ID ${id} ha sido eliminada.`,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message:
				'Ha ocurrido un error al elimiar la experiencia profesional',
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
	getProfessionalExp,
	createProfessionalExp,
	updateProfessionalExp,
	deleteProfessionalExp,
};
