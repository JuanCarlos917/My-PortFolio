const { Router } = require('express');
const aboutRoutes = require('./aboutRoutes');
const categoryRoutes = require('./categoryRoutes');
const teamDevRoutes = require('./teamDevRoutes')
const contactRoutes = require('./contactRoutes')

const app = Router();

// Rutas relacionadas con "Acerca de mí"
app.use('/about', aboutRoutes);
// Rutas relacionadas con categorías
app.use('/category', categoryRoutes);
// Rutas relacionadas con teamDevs
app.use('/teamDev', teamDevRoutes);
// Rutas relacionadas con contact
app.use('/contact', contactRoutes);

module.exports = app;
