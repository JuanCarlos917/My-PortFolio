const { generateUrl } = require('../controllers/s3MediaController');

const generateUrlMiddleware = async (req, res, next) => {
	try {
		const url = generateUrl(req.params.key);
		res.status(200).json({ message: 'URL generada correctamente.', url });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error al generar URL.' });
	}
};

module.exports = { generateUrlMiddleware };
