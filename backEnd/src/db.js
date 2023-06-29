require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
	{
		logging: false, // set to console.log to see the raw SQL queries
		native: false, // lets Sequelize know we can use pg-native for ~30% more speed
	},
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { About, Category, Client, Contact, CV, Education, Gallery, Project, Tag } =
	sequelize.models;

//Relaciones

//Relación Uno a Uno (One-to-One):
// En el modelo About
About.hasOne(CV);
// En el modelo CV
CV.belongsTo(About);

//Relación Uno a Muchos (One-to-Many):
// En el modelo Category
Category.hasMany(Project);
// En el modelo Project
Project.belongsTo(Category);
// En el modelo Client
Client.hasMany(Project);
// En el modelo Project
Project.belongsTo(Client);
// En el modelo Education
Education.belongsTo(CV);
// En el modelo Resume
CV.hasMany(Education);

//Relación Muchos a Muchos (Many-to-Many):
// En el modelo Project
Project.belongsToMany(Tag, { through: 'ProjectTag' });
// En el modelo Tag
Tag.belongsToMany(Project, { through: 'ProjectTag' });


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
