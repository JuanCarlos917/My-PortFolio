const {Services} = require('../index')

const getServices = async (req, res) => {
    try {
        const services = await Services.findAll();
        if (!services) {
            return res.status(404).json({
                message: 'No se encontraron servicios.',
            });
        }
        res.json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:
                'Ha ocurrido un error al obtener los servicios.',
        });
    }
}

const createService = async (req, res) => {
    try {
        const { name, description, price, imageUrl } = req.body;
        if (!name || !description || !imageUrl) {
			return res.status(400).json({
				message: 'El nombre la descripción y la Url de la imagen no pueden estar vacíos.',
			});
		}
        const existingService = await Services.findOne({ where: { name } });
        if (existingService) {
            return res.status(400).json({
                message:
                    'El servicio ya existe. Se debe modificar el que existe.',
            });
        }
        const newService = await Services.create({
			name,
			description,
			price,
			imageUrl,
		});
        res.json(newService);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:
                'Ha ocurrido un error al crear el servicio.',
        });
    }
}

const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, imageUrl } = req.body;
        if (!name || !description || !imageUrl) {
			return res.status(400).json({
				message: 'El nombre la descripción y la URL de la imagen no pueden estar vacíos.',
			});
		}
        const existingService = await Services.findOne({ where: { id } });
        if (!existingService) {
            return res.status(400).json({
                message:
                    'El servicio no existe. Se debe crear uno nuevo.',
            });
        }
        await Services.update(
			{
				name,
				description,
				price,
				imageUrl,
			},
			{
				where: { id },
			},
		);
        const updatedService = await Services.findOne({ where: { id } });
        return res.status(200).json({
			message: 'Se modifico correctamente el servicio.',
			updatedService: updatedService,
		});
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:
                'Ha ocurrido un error al actualizar el servicio.',
        });
    }
}

const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const existingService = await Services.findOne({ where: { id } });
        if (!existingService) {
            return res.status(400).json({
                message:
                    'El servicio no existe. No se puede eliminar.',
            });
        }
        const deletedService = await Services.destroy({
            where: { id },
        });
        res.json(deletedService);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:
                'Ha ocurrido un error al eliminar el servicio.',
        });
    }
}

module.exports = {
    getServices,
    createService,
    updateService,
    deleteService,
}