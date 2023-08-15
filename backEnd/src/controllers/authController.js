require('dotenv').config();
// Importamos los modelos de la base de datos
const { User } = require('../index');
// Importamos bcrypt para el hashing de las contraseñas
const bcrypt = require('bcryptjs');
// Importamos jsonwebtoken para la autenticación
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
	try {
		// Extraemos los campos necesarios del cuerpo de la petición
		const { email, password } = req.body;

		// Comprobamos si ya existe algún usuario
		const anyUser = await User.findOne();
		if (anyUser) {
			return res.status(400).json({
				message: 'Ya existe un usuario registrado.',
			});
		}
		// Buscamos un usuario existente con el mismo correo electrónico
		const existingUser = await User.findOne({ where: { email } });

		// Si existe un usuario con ese correo, enviamos una respuesta con un código de estado 400
		if (existingUser) {
			return res.status(400).json({
				message: 'El correo electrónico ya está registrado.',
			});
		}

		// Generamos un 'salt' para el hashing de la contraseña
		const salt = await bcrypt.genSalt(10);
		// Creamos un hash de la contraseña utilizando el salt
		const hashedPassword = await bcrypt.hash(password, salt);

		// Creamos un nuevo usuario en la base de datos con los datos proporcionados y la contraseña hasheada
		const newUser = await User.create({
			email,
			password: hashedPassword,
		});

		// Respondemos con los datos del nuevo usuario
		res.json(newUser);
	} catch (error) {
		// En caso de cualquier error, lo imprimimos en la consola
		console.error(error);
		// Y enviamos una respuesta con un código de estado 500 y un mensaje de error
		res.status(500).json({
			message: 'Ha ocurrido un error al registrar el usuario.',
		});
	}
};

const loginUser = async (req, res) => {
	try {
		// Extraemos los campos necesarios del cuerpo de la petición
		const { email, password } = req.body;

		// Buscamos un usuario existente con el mismo correo electrónico
		const existingUser = await User.findOne({ where: { email } });
		// Si no existe un usuario con ese correo, enviamos una respuesta con un código de estado 400
		if (!existingUser) {
			return res.status(400).json({
				message: 'El correo electrónico no está registrado.',
			});
		}
		// Se utiliza el método compare de bcrypt para comparar la contraseña ingresada por el usuario (password)
		// con la contraseña almacenada en la base de datos para el usuario existente (existingUser.password).
		// Este método devuelve una promesa que se resuelve en un booleano que indica si las contraseñas coinciden.
		const isMatch = await bcrypt.compare(password, existingUser.password);

		// Aquí se verifica si el usuario existe y si las contraseñas coinciden. Si ambas condiciones se cumplen,
		// entonces el usuario ha ingresado correctamente sus credenciales y puede iniciar sesión.
		if (existingUser && isMatch) {
			// Se genera un token de JWT. El primer argumento de jwt.sign es el payload del token, que contiene la
			// información que queremos incluir en el token. En este caso, se incluye el id del usuario, su correo
			// electrónico y un valor que indica si el usuario es administrador o no. El segundo argumento es la
			// clave secreta para firmar el token, que se toma de las variables de entorno. El tercer argumento
			// es un objeto de opciones para el token. Aquí se establece que el token expira en un día.
			const token = jwt.sign(
				{
					id: existingUser.id,
					email: existingUser.email,
				},
				process.env.JWT_SECRET,
				{ expiresIn: '1d' },
			);
			// res.cookie se utiliza para enviar una cookie al cliente junto con la respuesta HTTP.
			// En este caso, se esta enviando una cookie llamada 'token'.
			res.cookie(
				// El primer argumento es el nombre de la cookie. En este caso, 'token'.
				'token',

				// El segundo argumento es el valor de la cookie. En este caso, estamos pasando el token que hemos firmado previamente.
				token,

				// El tercer argumento es un objeto de opciones que nos permite configurar cómo se maneja la cookie.
				{
					// La opción 'httpOnly' es una medida de seguridad que evita que la cookie sea accedida o manipulada mediante JavaScript en el lado del cliente. Esto puede ayudar a prevenir ciertos ataques de cross-site scripting (XSS).
					httpOnly: true,

					// La opción 'secure' asegura que la cookie solo se envíe si la solicitud se realiza a través de una conexión segura (HTTPS). Esto protege la cookie de ser interceptada durante su transmisión por conexiones no seguras.
					secure: true,

					// La opción 'sameSite' define cómo se debe manejar la cookie cuando se hacen solicitudes a sitios diferentes al que creó la cookie. Si se configura como 'strict', la cookie sólo se enviará en solicitudes que se originen desde el mismo sitio que la cookie.
					sameSite: 'strict',
				},
			);

			// Se envía una respuesta al cliente con un mensaje de éxito y el token de JWT. El cliente deberá
			// incluir este token en las solicitudes subsiguientes para autenticarse.
			return res.json({
				message: 'Inicio de sesión exitoso.',
			});
		}

		// Si las contraseñas no coinciden, enviamos una respuesta con un código de estado 400
		if (!isMatch) {
			return res.status(400).json({
				message: 'La contraseña no es correcta.',
			});
		}
		// Respondemos con los datos del usuario
		res.json({
			existingUser,
			message: 'Inicio de sesión exitoso.',
		});
	} catch (error) {
		// En caso de cualquier error, lo imprimimos en la consola
		console.error(error);
		// Y enviamos una respuesta con un código de estado 500 y un mensaje de error
		res.status(500).json({
			message: 'Ha ocurrido un error al iniciar sesión.',
		});
	}
};

module.exports = {
	registerUser,
	loginUser,
};
