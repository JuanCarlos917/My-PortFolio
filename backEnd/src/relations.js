
// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
module.exports = function(models) {

    const {
        About,
        Category,
        TeamDev,
        CV,
        Education,
        Gallery,
        Project,
        Tag,
        User,
        ProfessionalExp,
    } = models;

    //Relaciones

    // Define una relación uno a uno entre los modelos 'About' y 'CV'
    // Un registro 'About' puede tener asociado un único registro 'CV'
    About.hasOne(CV);

    // Define una relación de pertenencia entre los modelos 'CV' y 'About'
    // Un registro 'CV' puede pertenecer a un único registro 'About'
    CV.belongsTo(About);

    // Define una relación uno a muchos entre 'CV' y 'Education' utilizando la clave foránea 'CVId'
    // Un registro 'CV' puede tener asociados múltiples registros 'Education'
    CV.hasMany(Education, { foreignKey: 'CVId' });

    // Define una relación de pertenencia entre 'Education' y 'CV' utilizando la clave foránea 'CVId'
    // Un registro 'Education' puede pertenecer a un único registro 'CV'
    Education.belongsTo(CV, { foreignKey: 'CVId' });

    // Define una relación uno a muchos entre 'CV' y 'Experiencia Profesional' utilizando la clave foránea 'CVId'
    // Un registro 'CV' puede tener asociados múltiples registros 'Experiencia Profesional'
    CV.hasMany(ProfessionalExp, { foreignKey: 'CVId' });

    // Define una relación de pertenencia entre 'Experiencia Profesional' y 'CV' utilizando la clave foránea 'CVId'
    // Un registro 'Experiencia Profesional' puede pertenecer a un único registro 'CV'
    ProfessionalExp.belongsTo(CV, { foreignKey: 'CVId' });

    // Define una relación muchos a muchos entre 'TeamDev' y 'Project' a través de la tabla intermedia 'ProjectTeamDevs'
    // Un 'TeamDev' puede estar asociados múltiples registros 'Projects' y viceversa.
    TeamDev.belongsToMany(Project, {
        through: 'ProjectTeamDevs',
        foreignKey: 'teamDevId',
    });

    // Define una relación muchos a muchos entre 'Project' y 'TeamDev' a través de la tabla intermedia 'ProjectTeamDevs'
    // Un registro'Project' puede tener asociados múltiples registros 'TeamDev' y viceversa.
    Project.belongsToMany(TeamDev, {
        through: 'ProjectTeamDevs',
        foreignKey: 'projectId',
    });

    // Define una relación muchos a muchos entre 'Project' y 'Category' a través de la tabla intermedia 'ProjectCategory'
    // Un registro 'Project' puede tener asociados múltiples registros 'Category', y viceversa
    Project.belongsToMany(Category, {
        through: 'ProjectCategory',
        foreignKey: 'projectId',
    });

    // Define una relación muchos a muchos entre 'Category' y 'Project' a través de la tabla intermedia 'CategoryProject'
    // Un registro 'Category' puede tener asociados múltiples registros 'Project', y viceversa
    Category.belongsToMany(Project, {
        through: 'ProjectCategory',
        foreignKey: 'categoryId',
    });

    // Define una relación muchos a muchos entre 'Project' y 'Tag' a través de la tabla intermedia 'ProjectTag'
    // Un registro 'Project' puede tener asociados múltiples registros 'Tag', y viceversa
    Project.belongsToMany(Tag, { through: 'ProjectTag' });

    // Define una relación muchos a muchos entre 'Tag' y 'Project' a través de la tabla intermedia 'ProjectTag'
    // Un registro 'Tag' puede tener asociados múltiples registros 'Project', y viceversa
    Tag.belongsToMany(Project, { through: 'ProjectTag' });

}