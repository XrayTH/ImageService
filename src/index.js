const express = require('express')
const cors = require('cors') 
const uploadRoutes = require('./routes/uploadRoutes')

const app = express()
const PORT = 3000

app.use(cors()); // Esto permite todos los dominios

/*
app.use(cors({
    origin: 'url' // Permitir solo solicitudes desde esa url
  }));
*/

// Usa las rutas
app.use('/imageService', uploadRoutes)

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})