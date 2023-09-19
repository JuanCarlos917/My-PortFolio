require('dotenv').config();
const nodemailer = require('nodemailer');

const contactMe = async (req, res) => {
	try {
		const { name, email, message } = req.body;
		const transporter = nodemailer.createTransport({
			service: 'Outlook',
			auth: {
				user: process.env.OUTLOOK_USER,
				pass: process.env.OUTLOOK_PASSWORD,
			},
		});
		const mailOptions = {
			from: `Portfolio Contac me <${process.env.OUTLOOK_USER}>`,
			to: process.env.OUTLOOK_USER,
			subject: `Contactame ${name} Portfolio`,
			html: `
                            <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mensaje desde Portafolio</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 50px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    a {
      color: #1a73e8;
      text-decoration: none;
    }
    .button {
      display: inline-block;
      background-color: #1a73e8;
      color: #ffffff;
      padding: 10px 20px;
      border-radius: 4px;
      text-align: center;
      margin: 10px 0;
      text-decoration: none;
    }
    @media screen and (max-width: 640px) {
      .container {
        margin: 20px 10px;
      }
    }
  </style>
</head>

<body>
  <div class="container">
    <a href="#" style="font-size:1.6em; font-weight:500; color: #202124;">My Portfolio</a>
    <hr style="border:none;border-top:1px solid #eee;margin-top: 16px;" />
    <p style="font-size:1.1em; color: #202124;">Has recibido un mensaje de ${name} (${email})</p>
    <p style="color: #5f6368;">${message}</p>
    <p style="font-size:0.9em; color: #5f6368;">Saludos,<br />Portfolio</p>
    <hr style="border:none;border-top:1px solid #eee;margin-top: 24px;" />
    <div style="padding:8px 0;color:#5f6368;font-size:0.8em;line-height:1.2;">
      <p>My Portfolio</p>
      <p>Redes sociales</p>
    </div>
  </div>
</body>

</html>
`,
		};
		await transporter.sendMail(mailOptions);
		res.status(200).send({ message: 'Mensaje enviado con éxito' });
        await automaticResponse(req);
	} catch (err) {
		console.error(err);
		res.status(500).send({
			message: 'Ha ocurrido un error al enviar la el mensaje',
		});
	}
};

const automaticResponse = async (req) => {
	try {
		const { name, email } = req.body;
		const transporter = nodemailer.createTransport({
			service: 'Outlook',
			auth: {
				user: process.env.OUTLOOK_USER,
				pass: process.env.OUTLOOK_PASSWORD,
			},
		});
		const mailOptions = {
			from: `Juan Carlos Gomez<${process.env.OUTLOOK_USER}>`,
			to: email,
			subject: `Gracias por contactarme`,
			html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gracias por Contactar</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 50px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    a {
      color: #1a73e8;
      text-decoration: none;
    }
    @media screen and (max-width: 640px) {
      .container {
        margin: 20px 10px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <a href="#" style="font-size:1.6em; font-weight:500; color: #202124;">My Portfolio</a>
    <hr style="border:none;border-top:1px solid #eee;margin-top: 16px;" />
    <p style="font-size:1.1em; color: #202124;">Hola ${name},</p>
    <p style="color: #202124;">Gracias por contactarme, en breve me pondré en contacto contigo.</p>
    <p style="font-size:0.9em; color: #5f6368;">Saludos,<br />Portfolio</p>
    <hr style="border:none;border-top:1px solid #eee;margin-top: 24px;" />
    <div style="padding:8px 0;color:#5f6368;font-size:0.8em;line-height:1.2;">
      <p>My Portfolio</p>
      <p>Redes sociales</p>
    </div>
  </div>
</body>
</html>
`,
		};
		await transporter.sendMail(mailOptions);
	} catch (err) {
		console.error(err);
		throw new Error('Error enviando respuesta automática');
	}
};


module.exports = { contactMe, automaticResponse };
