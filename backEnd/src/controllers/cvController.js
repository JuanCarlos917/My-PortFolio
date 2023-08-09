// Importar los modelos necesarios
const { CV, About, Education } = require('../db');

const getCV = async (req, res) => {
	try {
		//Validar el objeto de solicitud
		if (!req) {
			throw new Error('Invalid request object');
		}

		// Buscar un CV con información de "About" y "Education" incluida
		const cv = await CV.findOne({
			include: [About, Education],
		});

		if (!cv) {
			// Si no se encuentra ningún CV, responder con estado 404 y un mensaje de error
			return res.status(404).json({
				message: 'No se encontró el CV.',
			});
		}

		if (!cv.About) {
			// Si no se encuentra información de "About" asociada al CV, responder con estado 404 y un mensaje de error
			return res.status(404).json({
				message:
					'No se encontró información de "About" asociada al CV. Debes crear un "About" primero.',
			});
		}

		if (cv.Education.length === 0) {
			// Si no se encuentra información de "Education" asociada al CV, responder con estado 404 y un mensaje de error
			return res.status(404).json({
				message: 'Recueda agregar la educacion',
			});
		}

		// Responder con el CV encontrado en formato JSON
		res.json(cv);
	} catch (error) {
		// Manejar errores y responder con estado 500 y un mensaje de error
		console.error(error);
		res.status(500).json({
			message: 'Ha ocurrido un error al obtener el CV.',
		});
	}
};

const createCV = async (req, res) => {
	try {
		// Obtener los datos del cuerpo de la solicitud
		const {
			name,
			lastName,
			email,
			phone,
			social_media,
			proyects,
			experience,
		} = req.body;

		// Validar que todos los campos requeridos estén presentes en el cuerpo de la solicitud
		if (
			!name ||
			!lastName ||
			!email ||
			!phone ||
			!social_media ||
			!proyects ||
			!experience
		) {
			return res.status(400).json({
				message: 'Todos los campos son obligatorios.',
			});
		}

		// Buscar un CV existente por nombre y apellido
		const existingCV = await CV.findOne({ where: { name, lastName } });
		if (existingCV) {
			// Si se encuentra un CV existente, responder con estado 400 y un mensaje de error
			return res.status(400).json({
				message: 'El CV ya existe. Se debe modificar el que existe.',
			});
		}

		// Obtener la información de "About"
		const about = await About.findOne();
		if (!about) {
			// Si no se encuentra información de "About", responder con estado 404 y un mensaje de error
			return res.status(404).json({
				message:
					'No se encontró información de "About". Debes crear un "About" primero.',
			});
		}

		// Crear un nuevo CV con los datos proporcionados y asociar el ID de "About"
		const newCV = await CV.create({
			name,
			lastName,
			email,
			phone,
			social_media,
			proyects,
			experience,
			AboutId: about.id,
		});

		// Responder con el nuevo CV en formato JSON
		res.json(newCV);
	} catch (error) {
		// Manejar errores y responder con estado 500 y un mensaje de error
		console.error(error);
		res.status(500).json({
			message: 'Ha ocurrido un error al crear el CV.',
		});
	}
};


const updateCV = async (req, res) => {
    try {
        const {id} = req.params
        const {name, lastName, email, phone, social_media, proyects, experience} = req.body
        if (!name || !lastName || !email || !phone || !social_media || !proyects || !experience) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios.'
            })
        }
        const cv = await CV.findOne({where: {id}})
        if (!cv) {
            return res.status(404).json({
                message: 'No se encontró el CV.'
            })
        }
        const about = await About.findOne()
        if (!about) {
            return res.status(404).json({
                message: 'No se encontró información de "About". Debes crear un "About" primero.'
            })
        }
        await CV.update({
            name,
            lastName,
            email,
            phone,
            social_media,
            proyects,
            experience,
            AboutId: about.id
        }, {where: {id}})
        res.json({
            message: 'CV actualizado con éxito.'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Ha ocurrido un error al actualizar el CV.'
        })

    }
};

// Exportar las funciones de los controladores
module.exports = {
	getCV,
	createCV,
	updateCV,
};
