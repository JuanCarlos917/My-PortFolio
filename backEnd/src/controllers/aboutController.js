const { About } = require('../db');

// Controlador para obtener la información de "Acerca de mí"
const getAbout = async (req, res) => {
	try {
		const about = await About.findOne();
		if (!about) {
			return res
				.status(404)
				.json({
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

// Controlador para actualizar la información de "Acerca de mí"
const updateAbout = async (req, res) => {
	try {
		const aboutData = req.body;
		let about = await About.findOne();
		if (!about) {
			about = await About.create(aboutData);
		} else {
			about = await About.update(aboutData, {
				where: {
					id: about.id,
				},
			});
		}
		res.json({ message: 'Información actualizada correctamente.', about });
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
};
