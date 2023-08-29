require('dotenv').config();
const { Sequelize } = require('sequelize');


const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
	{
		logging: false,
		native: false,
	},
);

sequelize
	.authenticate()
	.then(() => {
		console.log('connection to db is successful.');
	})
	.catch((err) => {
		console.error('Unable to connect to the database:', err);
	});


module.exports = sequelize;
