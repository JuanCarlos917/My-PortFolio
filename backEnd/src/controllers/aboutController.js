const { About } = require('../db');

// Controlador para obtener la información de "Acerca de mí"
const getAbout = async (req, res) => {
	try {
		const about = await About.findOne();
		if (!about) {
			return res.status(404).json({
				message: 'No se encontró información de Acerca de mí.',
			});
		}
		res.json(about);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message:
				'Ha ocurrido un error al obtener la información de Acerca de mí.',
		});
	}
};

const createAbout = async (req, res) => {
	try {
		const { bio, skills } = req.body;
		if (!bio || !skills) {
			return res.status(400).json({
				message:
					'La biografía, las habilidades no pueden estar vacías.',
			});
		}
		const existingAbout = await About.findOne({ where: { bio } });
		if (existingAbout) {
			return res.status(400).json({
				message:
					'La información de Acerca de mí ya existe. Se debe modificar la que existe.',
			});
		}
		const newAbout = await About.create({
			bio,
			skills,
		});
		res.json(newAbout);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message:
				'Ha ocurrido un error al crear la información de Acerca de mí.',
		});
	}
};

// Controlador para actualizar la información de "Acerca de mí"
const updateAbout = async (req, res) => {
	try {
		const { id } = req.params;
		const { bio, skills } = req.body;
		if (!bio || !skills) {
			return res.status(400).json({
				message:
					'La biografía, las habilidades no pueden estar vacías.',
			});
		}
		const about = await About.findOne({ where: { id } });
		if (!about) {
			return res.status(404).json({
				message: 'No se encontró información de Acerca de mí.',
			});
		}
		about.bio = bio;
		about.skills = skills;
		await about.save();
		res.json(about);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message:
				'Ha ocurrido un error al actualizar la información de Acerca de mí.',
		});
	}
};

module.exports = {
	getAbout,
	updateAbout,
	createAbout,
};
