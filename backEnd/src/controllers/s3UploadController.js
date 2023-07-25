require('dotenv').config();

// Importa el módulo de sistema de archivos (fs) de Node.js para trabajar con archivos del sistema
const fs = require('fs');

// Carga las variables de entorno para AWS S3 desde el archivo .env
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

// Importa las funciones necesarias del SDK de AWS
const {
	S3Client,
	GetObjectCommand,
	PutObjectCommand,
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

// Invoca la función `generateSignedUrl` para generar una URL firmada para un archivo específico
async function init() {
	console.log(
		'URL para blue Modern',
		await generateSignedUrl('LogoClaro.png'),
	);
}
init();

// Define una función para cargar un archivo en S3
const uploadFile = async (pathFile) => {
	try {
		// Lee el contenido del archivo desde el sistema de archivos
		const fileContent = fs.readFileSync(pathFile);

		// Define los parámetros para la operación de carga en S3
		const input = {
			Bucket: AWS_BUCKET_NAME,
			Key: pathFile, // Este será el nombre del archivo en S3
			Body: fileContent, // Y este es el contenido del archivo
		};

		// Define el comando para cargar el archivo en S3
		const command = new PutObjectCommand(input);

		// Envía el comando al cliente de S3 y espera la respuesta
		const response = await client.send(command);
		return response;
	} catch (error) {
		console.error(error);
	}
};

// Exporta las funciones para que puedan ser utilizadas en otros módulos
module.exports = { generateSignedUrl, uploadFile };
