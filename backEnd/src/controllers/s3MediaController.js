require('dotenv').config();
// Carga las variables de entorno para AWS S3 desde el archivo .env
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

const multer = require('multer');
// Importa las funciones SDK de AWS
const {
	S3Client,
	GetObjectCommand,
	PutObjectCommand,
	ListObjectsCommand,
	HeadObjectCommand,
	DeleteObjectCommand,
} = require('@aws-sdk/client-s3');
// Importa la función para generar URLs firmadas de S3
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// Crea una instancia de S3Client con las credenciales y la región obtenidas de las variables de entorno
const client = new S3Client({
	region: AWS_BUCKET_REGION,
	credentials: {
		accessKeyId: AWS_PUBLIC_KEY,
		secretAccessKey: AWS_SECRET_KEY,
	},
});

// Define una función para generar una URL firmada de S3 para un archivo específico
const generateSignedUrl = async (key) => {
	try {
		const command = new GetObjectCommand({
			Bucket: AWS_BUCKET_NAME,
			Key: key,
		});
		const url = await getSignedUrl(client, command, { expiresIn: 3600 });
		return url;
	} catch (error) {
		console.error(error);
	}
};

const generateSignedUrlMiddleware = async (req, res, next) => {
	try {
		const url = await generateSignedUrl(req.params.key);
		res.status(200).json({ message: 'URL generada correctamente.', url });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error al generar URL.' });
	}
};

const listFiles = async (req, res, next) => {
	try {
		const command = new ListObjectsCommand({
			Bucket: AWS_BUCKET_NAME,
		});

		const data = await client.send(command);

		// Esto dará una lista de todos los objetos en el bucket
		const files = data.Contents;

		// Solo se obtiene las claves (nombres) de los objetos
		const fileNames = files.map((file) => file.Key);

		res.status(200).json(fileNames);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error al listar los archivos.' });
	}
};

// Configuración de multer para guardar los archivos en memoria como Buffer
const upload = multer({ storage: multer.memoryStorage() });

// Define una función para cargar un archivo en S3
const uploadFile = async (req, res) => {
	try {
		// Verifica si hay un archivo en la solicitud
		if (!req.file) {
			res.status(400).json({
				message: 'Archivo no encontrado en la solicitud',
			});
			return;
		}

		// Lee el archivo de la solicitud
		const fileContent = req.file.buffer;
		const s3FileName = req.file.originalname;

		// Comprueba si un archivo con el mismo nombre ya existe en el bucket
		const headCommand = new HeadObjectCommand({
			Bucket: AWS_BUCKET_NAME,
			Key: s3FileName,
		});

		try {
			await client.send(headCommand);

			// Si no se lanzó ninguna excepción, entonces el objeto existe
			res.status(400).json({
				message: 'Ya existe un archivo con ese nombre.',
			});
			return;
		} catch (error) {
			if (error.name !== 'NotFound') {
				// Se produjo otro error al intentar obtener los metadatos del objeto
				throw error;
			}
			// Si el error es 'NotFound', entonces el archivo no existe y podemos continuar
		}

		// Define los parámetros para la operación de carga en S3
		const input = {
			Bucket: AWS_BUCKET_NAME,
			Key: s3FileName, // Este será el nombre del archivo en S3
			Body: fileContent, // Y este es el contenido del archivo
			ContentDisposition: 'inline', // Asegurarse de que el archivo se muestre en lugar de descargarse
			ContentType: 'image/jpeg', // Este es el tipo de contenido del archivo
		};

		// Define el comando para cargar el archivo en S3
		const command = new PutObjectCommand(input);

		// Envía el comando al cliente de S3 y espera la respuesta
		const response = await client.send(command);
		res.status(200).json({
			message: 'El archivo se ha cargado correctamente en S3',
			data: response,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Ha ocurrido un error al obtener los proyectos',
		});
	}
};

const delteFileS3 = async (req, res) => {
    try {
	// Crea un nuevo comando DeleteObjectCommand
	const command = new DeleteObjectCommand({
		Bucket: AWS_BUCKET_NAME, // Nombre del bucket
		Key: req.params.key, // Nombre del archivo (clave del objeto en S3)
	});
	// Envía el comando al cliente de S3 y espera la respuesta
		const data = await client.send(command);

		// Si todo sale bien, responde con un mensaje de éxito y los datos de la respuesta de S3
		res.status(200).json({
			message: 'Archivo eliminado correctamente',
			data: data,
		});
	} catch (error) {
		// Si algo sale mal, registra el error y responde con un mensaje de error
		console.error(error);
		res.status(500).json({ message: 'Error al eliminar el archivo' });
	}
};

module.exports = {
	generateSignedUrl,
	uploadFile,
	upload,
	listFiles,
	generateSignedUrlMiddleware,
	delteFileS3,
};
