const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const appRoutes = require('./routes');
const cors = require('cors');
require('dotenv').config();

require('./db.js');

const server = express();

server.name = 'API';

// Configurar opciones de CORS
const corsOptions = {
	origin: `${process.env.BASE_URL}`, // Replace with the exact origin of your application
	credentials: true,
	methods: 'GET, POST, OPTIONS, PUT, DELETE',
	allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
};

server.use(cors(corsOptions));

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

server.use(appRoutes);

server.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

module.exports = server;

///////////////////////////////

// const express = require("express");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser")
// const morgan = require ("morgan");
// const appRoutes = require ("./routes")
// const fileUpload = require('express-fileupload');
// const cors = require('cors');

// require ("./db.js")

// const server = express();

// server.name = "API";

// server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// server.use(bodyParser.json({ limit: '50mb' }));
// server.use(cookieParser());
// server.use(
// 	fileUpload({
// 		useTempFiles: true,
// 		tempFileDir: './archivos',
// 	}),
// );
// server.use(morgan('dev'));
// server.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();
// });
// server.use(appRoutes);

// server.use((err, req, res, next) => {
//     const status = err.status || 500;
//     const message = err.message || err;
//     console.error(err);
//     res.status(status).send(message);
//   });

//   module.exports = server;
