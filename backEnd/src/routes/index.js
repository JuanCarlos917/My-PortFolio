const { Router } = require('express');
const aboutRoutes = require('./aboutRoutes');
const categoryRoutes = require('./categoryRoutes');

const app = Router();

// Rutas relacionadas con "Acerca de mí"
app.use('/about', aboutRoutes);
// Rutas relacionadas con categorías
app.use('/category', categoryRoutes);

module.exports = app;
