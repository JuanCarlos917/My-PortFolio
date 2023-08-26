require('dotenv').config();
// Importamos los modelos de la base de datos
const { User } = require('../index');
// Importamos bcrypt para el hashing de las contraseñas
const bcrypt = require('bcryptjs');
// Importamos jsonwebtoken para la autenticación
const jwt = require('jsonwebtoken');
// Importamos nodemailer para el envío de correos electrónicos
const nodemailer = require('nodemailer');
// Importamos la función Op de sequelize para realizar consultas
const { Op } = require('sequelize');



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

const logoutUser = async (req, res) =>{
    try {
		// Borrar la cookie del token
		res.clearCookie('token');
		res.json({
			message: 'Cierre de sesión exitoso.',
		});
	} catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Ha ocurrido un error al cerrar sesión.',
        });
    }
}

const forgotPassword = async (req, res) => {
    try{
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        if(!user){
            return res.status(400).json({
                message: 'No existe una cuenta asociada a ese correo electrónico.',
            });
        }
        // Generar token de reseteo de contraseña
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' },
        );
        // Guardar el token en la base de datos
        await user.update({
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 3600000,
        });
        // Crear el transportador de nodemailer
        const transporter = nodemailer.createTransport({
			service: 'Outlook',
			auth: {
				user: process.env.OUTLOOK_USER,
				pass: process.env.OUTLOOK_PASSWORD,
			},
		});
        // Crear el mensaje de correo electrónico
        const mailOptions = {
			from: `Portfolio <${process.env.OUTLOOK_USER}>`,
			to: user.email,
			subject: 'Restablecer contraseña',
			text: `Hola ${user.email},\n\n
                Para restablecer la contraseña de tu cuenta, haz clic en el siguiente enlace o pégalo en tu navegador:\n\n
                ${process.env.VITE_BASE_URL}/reset-password/${token}\n\n
                Si no solicitaste restablecer la contraseña, ignora este correo electrónico y tu contraseña permanecerá sin cambios.\n`,
		};
        // Enviar el correo electrónico
        await transporter.sendMail(mailOptions);
        res.json({
            message: 'Se ha enviado un correo electrónico a la dirección proporcionada con más instrucciones.',
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: 'Ha ocurrido un error al restablecer la contraseña. forgot',
        });
    }
}

const resetPassword = async(req, res) => {
    try{
        const { token } = req.params;
        const { password } = req.body;

        if(!token || !password ){
            return res.status(400).json({
                message: 'Token de restablecimiento de contraseña no válido o expirado.',
            });
        }
        // Buscar usuario con el token de reseteo de contraseña
        const user = await User.findOne({
			where: {
				resetPasswordToken: token,
				resetPasswordExpires: { [Op.gt]: Date.now() },
			},
		});
        if(!user){
            return res.status(400).json({
                message: 'Token de restablecimiento de contraseña no válido o expirado.',
            });
        }
        // Generar un 'salt' para el hashing de la contraseña
        const salt = await bcrypt.genSalt(10);
        // Crear un hash de la contraseña utilizando el salt
        const hashedPassword = await bcrypt.hash(password, salt);
        // Actualizar la contraseña del usuario
        await user.update({
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null,
        });
        res.json({
            message: 'Se ha restablecido la contraseña correctamente.',
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: 'Ha ocurrido un error al restablecer la contraseña. resetPassword',
        });
    }
}

module.exports = {
	registerUser,
	loginUser,
	logoutUser,
	forgotPassword,
	resetPassword,
};
