const path = require('path')
const multer = require('multer')

// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Utiliza __dirname para obtener la ruta absoluta, subiendo un nivel para salir de la carpeta "controllers"
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

module.exports = { upload, uploadImage }

