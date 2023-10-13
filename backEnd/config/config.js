require('dotenv').config();
module.exports = {
	development: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: 'postgres',
	},
	production: {
		username: process.env.DB_PROD_USER,
		password: process.env.DB_PROD_PASSWORD,
		database: process.env.DB_PROD_NAME,
		host: process.env.DB_PROD_HOST,
		port: process.env.DB_PROD_PORT,
		dialect: 'postgres',
	},
};
