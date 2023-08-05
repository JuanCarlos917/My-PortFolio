const { Router } = require('express');
const aboutRoutes = require('./aboutRoutes');
const categoryRoutes = require('./categoryRoutes');
const teamDevRoutes = require('./teamDevRoutes')
const contactRoutes = require('./contactRoutes')
const cvRoutes = require('./cvRoutes')
const educationRoutes = require('./educationRoutes')
const galleryRoutes = require('./galleryRoutes');
const projectRoutes = require('./projectRoutes')
const tagRoutes = require('./tagRoutes')
const s3MediaRoutes = require('./s3MediaRoutes');
const authRoutes = require('./authRoutes');

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
// Rutas relacionadas con projects
app.use('/project', projectRoutes);
// Rutas relacionadas con tags
app.use('/tag', tagRoutes);
// Rutas relacionadas con s3Upload
app.use('/s3Media', s3MediaRoutes);
// Rutas relacionadas con autenticación
app.use('/auth', authRoutes);


module.exports = app;
