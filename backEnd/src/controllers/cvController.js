const { CV, About } = require('../db');

const getCV = async (req, res) => {
	try {
		const cv = await CV.findOne({
			include: [About], // Incluir el modelo "About" en la consulta
		});

		if (!cv) {
			return res.status(404).json({
				message: 'No se encontró el CV.',
			});
		}

		if (!cv.About) {
			return res.status(404).json({
				message:
					'No se encontró información de "About" asociada al CV. Debes crear un "About" primero.',
			});
		}

		res.json(cv);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Ha ocurrido un error al obtener el CV.',
		});
	}
};


const createCV = async (req, res) => {
	try {
		const {
			name,
			lastName,
			email,
			phone,
			social_media,
			proyects,
			education,
			experience,
			skills,
		} = req.body;

		if (
			!name ||
			!lastName ||
			!email ||
			!phone ||
			!social_media ||
			!proyects ||
			!education ||
			!experience ||
			!skills
		) {
			return res.status(400).json({
				message: 'Todos los campos son obligatorios.',
			});
		}

		const existingCV = await CV.findOne({ where: { name, lastName } });
		if (existingCV) {
			return res.status(400).json({
				message: 'El CV ya existe. Se debe modificar el que existe.',
			});
		}

		const about = await About.findOne(); // Obtén el primer registro de "About"

		if (!about) {
			return res.status(404).json({
				message:
					'No se encontró información de "About". Debes crear un "About" primero.',
			});
		}

		const newCV = await CV.create({
			name,
			lastName,
			email,
			phone,
			social_media,
			proyects,
			education,
			experience,
			skills,
			AboutId: about.id, // Utiliza el ID del registro de "Abouts" creado previamente
		});

		res.json(newCV);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Ha ocurrido un error al crear el CV.',
		});
	}
};


const updateCV = async (req, res) => {
	try {
		const cvData = req.body;
		let cv = await CV.findOne();

		if (!cv) {
			cv = await CV.create(cvData);
		} else {
			let hasChanges = false;

			// Compara los valores campo por campo
			Object.keys(cvData).forEach((key) => {
				if (cv[key] !== cvData[key]) {
					cv[key] = cvData[key]; // Actualiza el valor en el objeto cv
					hasChanges = true; // Marca que ha habido cambios
				}
			});

			if (!hasChanges) {
				return res.json({
					message:
						'No se ha realizado ninguna modificación en el CV.',
				});
			}

			// Verifica si hay cambios en los datos, excluyendo el campo "id" y "AboutId"
			const isSameData = Object.keys(cvData)
				.filter((key) => key !== 'id' && key !== 'AboutId')
				.every((key) => cv[key] === cvData[key]);

			if (isSameData) {
				return res.json({
					message:
						'No se ha realizado ninguna modificación en el CV.',
				});
			}

			await cv.save(); // Guarda los cambios en la base de datos
		}

		res.json({ message: 'CV actualizada correctamente.' });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Ha ocurrido un error al actualizar el CV.',
		});
	}
};




module.exports = {
	getCV,
	createCV,
	updateCV,
};
