const { Router } = require('express');
const aboutRoutes = require('./aboutRoutes');

const app = Router();

// Otras configuraciones de tu aplicación Express

// Rutas relacionadas con "Acerca de mí"
app.use('/about', aboutRoutes);

module.exports = app;
