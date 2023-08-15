const { Category } = require('../index');

//controlador para obtener todas las categotias desde la base de datos
const getCategories = async (req, res) => {
	try {
		// Validar el objeto de solicitud
		if (!req) {
			throw new Error('Invalid request object');
		}
		const categories = await Category.findAll();

		if (categories.length === 0) {
			return res.status(404).json({
				message: 'No se encontraron categorías.',
			});
		}

		res.json(categories);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Ha ocurrido un error al obtener las categorías.',
		});
	}
};

//controlador para modificar los datos Categoria - funcion asincrónica
const updateCategory = async(req, res) =>{
    try {
		// Extrae 'id' de los parámetros de la solicitud
		const { id } = req.params;

		// Extraemos los campos del cuerpo de la solicitud
		const { name } = req.body;

		// Busca una categoría existente en la base de datos
		const existingCategory = await Category.findOne({ where: { id } });

		// Si no se encuentra ninguna categoría, devuelve un estado 400
		if (!existingCategory) {
			return res.status(404).json({
				message: `No se encontró la categoría con ID ${id} existente para modificar. Asegúrate de que el ID de la categoría proporcionada sea correcta y que el registro de la categoría ya exista en la base de datos.`,
			});
		}
		// Intenta actualizar la categoría en la base de datos
		const category = await Category.update({ name }, { where: { id } });

		// Comprueba si la operación de actualización fue exitosa
		if (category) {
			// Si fue exitosa, envía un mensaje de éxito al cliente
			res.json({
				message: `La categoría con ID ${id} se actualizó correctamente.`,
			});
		} else {
			// Si no fue exitosa, envía un mensaje de error al cliente
			res.status(404).json({
				message: `No se encontró la categoría con ID ${id}.`,
			});
		}
	} catch (error) {
        // Si hay un error, imprímelo en la consola
        console.error(error);

        // Envía un mensaje de error al cliente
        res.status(500).json({ message: 'Ha ocurrido un error al actualizar la categoría.' });
    }
}

//controlador para crear una nueva categoria y agregarla a la base de datos
const createCategory = async (req, res) => {
	try {
		const { name } = req.body;
		const existingCategory = await Category.findOne({ where: { name } });

		if (existingCategory) {
			return res.status(400).json({
				message: 'La categoría ya existe.',
			});
		}

		const newCategory = await Category.create({ name });
		res.json(newCategory);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Ha ocurrido un error al crear la categoría.',
		});
	}
};


//controlado para eliminar la categoria de la base de datos mediante id
const deleteCategory = async (req, res) => {
	try {
		const { id } = req.params;
		const category = await Category.destroy({ where: { id } });

		if (category) {
			res.json({
				message: `La categoría con ID ${id} se eliminó correctamente.`,
			});
		} else {
			res.status(404).json({
				message: `No se encontró la categoría con ID ${id}.`,
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Ha ocurrido un error al eliminar la categoría.',
		});
	}
};



module.exports = {
	getCategories,
	createCategory,
	deleteCategory,
	updateCategory,
};
