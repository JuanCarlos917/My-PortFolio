require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
	About,
	Category,
	TeamDev,
	Contact,
	CV,
	Education,
	Gallery,
	Project,
	Tag,
} = sequelize.models;

//Relaciones

//Relación Uno a Uno (One-to-One):
// En el modelo About
About.hasOne(CV);
// En el modelo Education
// Education.hasOne(CV);
// En el modelo CV
CV.belongsTo(About);
// CV.belongsTo(Education);

//Relación Uno a Muchos (One-to-Many):
// En el modelo Category
Category.hasMany(Project);
// En el modelo Project
Project.belongsTo(Category);
// En el modelo TeamDev
TeamDev.hasMany(Project);
// En el modelo Project
Project.belongsTo(TeamDev);

Education.hasMany(CV, { foreignKey: 'EducationId' });
CV.belongsTo(Education, { foreignKey: 'EducationId' });

//Relación Muchos a Muchos (Many-to-Many):
// En el modelo Project
Project.belongsToMany(Tag, { through: 'ProjectTag' });
// En el modelo Tag
Tag.belongsToMany(Project, { through: 'ProjectTag' });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
