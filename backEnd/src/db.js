require('dotenv').config();
const { Sequelize } = require('sequelize');


const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
	{
		logging: false,
		native: false,
		dialectOptions: {
			// ssl: {
			// 	require: true,
			// 	rejectUnauthorized: false, // Esto es necesario si estás usando un certificado autofirmado; para un certificado válido, deberías usar 'true'
			// },
		},
	},
);

sequelize
	.authenticate()
	.then(() => {
		console.log('connection to db is successful.');
	})
	.catch((err) => {
		console.error('Unable to connect to the db:', err);
	});


module.exports = sequelize;
