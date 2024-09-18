const express = require('express')
const { upload, uploadImage, getImage, listImages, deleteImage } = require('../controllers/uploadController')

const router = express.Router()

// Ruta para subir imágenes
router.post('/upload', upload.single('image'), uploadImage)

// Ruta para acceder a una imagen por su nombre
router.get('/image/:filename', getImage)

// Ruta para listar todas las imágenes
router.get('/images', listImages)

// Ruta para eliminar una imagen por su nombre
router.delete('/image/:filename', deleteImage)

module.exports = router

