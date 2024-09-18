const path = require('path')
const fs = require('fs')
const multer = require('multer')

// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads')) // Carpeta donde se guardan las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extension = path.extname(file.originalname) // Extensión del archivo
    cb(null, file.fieldname + '-' + uniqueSuffix + extension) // Nombre del archivo
  }
})

const upload = multer({ storage: storage })

// Controlador para manejar la subida de imágenes
const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se subió ninguna imagen.')
  }
  res.send({ filename: req.file.filename }) // Retorna el nombre del archivo
}

// Controlador para acceder a una imagen por su nombre
const getImage = (req, res) => {
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
}

// Controlador para listar todas las imágenes
const listImages = (req, res) => {
  const uploadsDir = path.join(__dirname, '..', 'uploads')

  // Leer el contenido de la carpeta 'uploads'
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).send('Error al leer la carpeta de imágenes')
    }
    res.json(files) // Enviar los nombres de los archivos en formato JSON
  })
}

// Controlador para eliminar una imagen por nombre
const deleteImage = (req, res) => {
  const filename = req.params.filename
  const filePath = path.join(__dirname, '..', 'uploads', filename)

  // Verificar si el archivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('Imagen no encontrada')
    }

    // Eliminar el archivo
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).send('Error al eliminar la imagen')
      }
      res.send(`Imagen ${filename} eliminada correctamente`)
    })
  })
}

module.exports = { upload, uploadImage, getImage, listImages, deleteImage }


