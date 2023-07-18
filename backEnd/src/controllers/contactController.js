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
// Controlador para actualizar un contacto
const updateContact = async (req, res) => {
    try {
        // Extraemos el ID del contacto de los parámetros de la ruta
        const { id } = req.params;

        // Extraemos los campos del cuerpo de la solicitud
        const { name, email, phone, social_media } = req.body;

        // Verificamos que todos los campos estén presentes, de lo contrario respondemos con un error
        if (!name || !email || !phone || !social_media) {
            return res.status(400).json({
                message: 'El nombre, el email, el telefono y las redes sociales del contacto no pueden estar vacíos.',
            });
        }

        // Buscamos el contacto existente en la base de datos
        const existingContact = await Contact.findOne({ where: { id } });

        // Si el contacto no existe, respondemos con un error
        if (!existingContact) {
            return res.status(400).json({
                message: 'El contacto no existe.',
            });
        }

        // Actualizamos los datos del contacto en la base de datos
        await Contact.update(
            {
                name,
                email,
                phone,
                social_media,
            },
            { where: { id } },
        );

        // Recuperamos los datos actualizados del contacto de la base de datos
        const updatedContact = await Contact.findOne({ where: { id } });

        // Respondemos con un mensaje de éxito y los datos actualizados del contacto
        return res.status(200).json({
            message: 'Se modifico correctamente los datos de contacto.',
            contactUpdated: updatedContact,
        });
    } catch (error) {
        // Si ocurre un error, lo registramos y respondemos con un mensaje de error
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