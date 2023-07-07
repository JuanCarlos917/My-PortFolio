const { Contact } = require('../db');

//controlador para obtener los datos de contacto
const getContact = async (req, res) => {
    try {
        const contacts = await Contact.findAll();

        if (contacts.length === 0) {
            return res.status(404).json({
                message: 'No se encontraron contactos.',
            });
        }

        res.json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Ha ocurrido un error al obtener los contactos.',
        });
    }
}

//controlador para crear los datos de contacto
const createContact = async (req, res) => {
    try {
        const { name, email, phone, social_media } = req.body;

        if (!name || !email || !phone || !social_media) {
			return res.status(400).json({
				message:
					'El nombre, el email, el telefono y las redes sociales del contacto no pueden estar vacíos.',
			});
		}

        const existingContact = await Contact.findOne({ where: { name } });

        if (existingContact) {
            return res.status(400).json({
                message: 'El contacto ya existe.',
            });
        }

        const newContact = await Contact.create({
			name,
			email,
			phone,
			social_media,
		});
        res.json(newContact);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Ha ocurrido un error al crear el contacto.',
        });
    }
}

//controlador para modificar los datos de contacto
const updateContact = async (req, res) => {
    try {
        const { id } = req.params;

        const { name, email, phone, social_media } = req.body;

        if (!name || !email || !phone || !social_media) {
            return res.status(400).json({
                message:
                    'El nombre, el email el telefono y las redes sociales del contacto no pueden estar vacíos.',
            });
        }

        const existingContact = await Contact.findOne({ where: { id } });

        if (!existingContact) {
            return res.status(400).json({
                message: 'El contacto no existe.',
            });
        }

        const updatedContact = await Contact.update(
            {
                name,
                email,
                phone,
                social_media,
            },
            { where: { id } },

        );
        return res.status(200).json({
			message: 'Se modifico correctamente los datos de contacto.',
		});

        res.json(updatedContact);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Ha ocurrido un error al actualizar el contacto.',
        });
    }
}

//controlador para eliminar los datos de contacto
const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const existingContact = await Contact.findOne({ where: { id } });
        const contactName = existingContact ? existingContact.name : null;

        if (!existingContact) {
            return res.status(400).json({
                message: 'El contacto no existe.',
            });
        }

        await Contact.destroy({ where: { id } });

        res.json({
			message: `El contacto de ${contactName} con ID ${id} ha sido eliminado.`,
		});
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Ha ocurrido un error al eliminar el contacto.',
        });
    }
}

module.exports = {
    getContact,
    createContact,
    updateContact,
    deleteContact,
};