const { Category } = require('../db');

//controlador para obtener todas las categotias desde la base de datos
const getCategories = async (req, res) => {
	try {
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

//controlador para crear una nueva categoria y agregarla a la base de datos
const createCategory = async (req, res) => {
	try {
		const { name } = req.body;

		if (!name) {
			return res
				.status(400)
				.json({
					message: 'El nombre de la categoría no puede estar vacío.',
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
};
