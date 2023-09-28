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
        const { name, description, price } = req.body;
        if (!name || !description) {
            return res.status(400).json({
                message:
                    'El nombre y la descripción no pueden estar vacíos.',
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
        const { name, description, price } = req.body;
        if (!name || !description) {
            return res.status(400).json({
                message:
                    'El nombre y la descripción no pueden estar vacíos.',
            });
        }
        const existingService = await Services.findOne({ where: { id } });
        if (!existingService) {
            return res.status(400).json({
                message:
                    'El servicio no existe. Se debe crear uno nuevo.',
            });
        }
        const updatedService = await Services.update(
            {
                name,
                description,
                price,
            },
            {
                where: { id },
            },
        );
        res.json(updatedService);
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