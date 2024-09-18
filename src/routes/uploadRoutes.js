const express = require('express')
const path = require('path')
const fs = require('fs')
const { upload, uploadImage } = require('../controllers/uploadController')

const router = express.Router()

// Ruta para subir imágenes
router.post('/upload', upload.single('image'), uploadImage)

// Ruta para acceder a una imagen por su nombre
router.get('/image/:filename', (req, res) => {
  const filename = req.params.filename
  const filePath = path.join(__dirname, '..', 'uploads', filename)

  // Verificar si el archivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('Imagen no encontrada')
    }

    // Enviar el archivo si existe
    res.sendFile(filePath)
  })
})

module.exports = router
