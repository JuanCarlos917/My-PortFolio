const express = require('express')
const router = express()
const {getCV,
    createCV,
    updateCV,} = require('../controllers/cvController')
const {updateCVValidations,
    handleValidationErrors,} = require('../utils/cvValidations')

// Ruta para obtener la información del CV
router.get('/', getCV)
// Rutas para crear y actualizar el contenido del CV
router.post('/', updateCVValidations, handleValidationErrors, createCV)
// Ruta para actualizar la información del CV
router.put('/', updateCVValidations, handleValidationErrors, updateCV)

module.exports=router;