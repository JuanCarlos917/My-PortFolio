const { Router } = require('express');
const aboutRoutes = require('./aboutRoutes');
const categoryRoutes = require('./categoryRoutes');
const teamDevRoutes = require('./teamDevRoutes')
const contactRoutes = require('./contactRoutes')
const cvRoutes = require('./cvRoutes')
const educationRoutes = require('./educationRoutes')
const galleryRoutes = require('./galleryRoutes');

const app = Router();

// Rutas relacionadas con "Acerca de mí"
app.use('/about', aboutRoutes);
// Rutas relacionadas con categorías
app.use('/category', categoryRoutes);
// Rutas relacionadas con teamDevs
app.use('/teamDev', teamDevRoutes);
// Rutas relacionadas con contact
app.use('/contact', contactRoutes);
// Rutas relacionadas con CV
app.use('/cv', cvRoutes);
// Rutas relacionadas con education
app.use('/education', educationRoutes);
// Rutas relacionadas con gallery
app.use('/gallery', galleryRoutes);


module.exports = app;
