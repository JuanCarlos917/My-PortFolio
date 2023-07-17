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

const createAbout = async (req, res) => {
    try {
        const { bio, skills, experience } = req.body;
        if(!bio ||!skills || !experience){
            return res.status(400).json({
                message: 'La biografía, las habilidades y la experiencia no pueden estar vacías.',
            });
        }
        const existingAbout = await About.findOne({where: {bio}})
        if(existingAbout){
            return res.status(400).json({
                message: 'La información de Acerca de mí ya existe. Se debe modificar la que existe.',
            });
        }
        const newAbout = await About.create({
            bio,
            skills,
            experience,
        });
        res.json(newAbout);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Ha ocurrido un error al crear la información de Acerca de mí.',
        });
    }
}

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
	createAbout,
};
