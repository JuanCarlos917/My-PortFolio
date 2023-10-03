const { StarRating } = require('../index');

// Controlador para obtener las estrellas y comentarios
const getAllStarRating = async (req, res) => {
    try {
        const starRating = await StarRating.findAll();
        if (!starRating) {
            return res.status(404).json({
                message: 'No se encontró información de las estrellas.',
            });
        }
        res.json(starRating);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:
                'Ha ocurrido un error al obtener la información de las estrellas.',
        });
    }
};

// Controlador para crear las estrellas y comentarios
const createStarRating = async (req, res) => {
    try {
        const { starRating, comment } = req.body;
        if (!starRating) {
			return res.status(400).json({
				message: 'Las estrellas no pueden estar vacías.',
			});
		}
        const newStarRating = await StarRating.create({
			starRating,
			comment,
		});
        res.json(newStarRating);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:
                'Ha ocurrido un error al crear la información de las estrellas.',
        });
    }
};

// Controlador para actualizar las estrellas y comentarios
const updateStarRating = async (req, res) => {
    try {
        const { id } = req.params;
        const { starRating, comment } = req.body;
        if (!starRating) {
			return res.status(400).json({
				message: 'Las estrellas no pueden estar vacías.',
			});
		}
        const star = await StarRating.findOne({ where: { id } });
        if (!star) {
			return res.status(404).json({
				message: 'No se encontró información de las estrellas.',
			});
		}
        await starRating.update({
			starRating,
			comment,
		});
        res.json(starRating);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:
                'Ha ocurrido un error al actualizar la información de las estrellas.',
        });
    }
};

// Controlador para eliminar las estrellas y comentarios
const deleteStarRating = async (req, res) => {
    try {
        const { id } = req.params;
        const star = await StarRating.findOne({ where: { id } });
        if (!star) {
            return res.status(404).json({
                message: 'No se encontró información de las estrellas.',
            });
        }
        await star.destroy();
        res.json({
            message: 'Se eliminó la información de las estrellas.',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:
                'Ha ocurrido un error al eliminar la información de las estrellas.',
        });
    }
};

module.exports = {
    getAllStarRating,
    createStarRating,
    updateStarRating,
    deleteStarRating,
};