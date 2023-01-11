import path from 'path'
import { fileURLToPath } from 'url'

//Importa la url donde estamos parado, maneja rutas
const __filename = fileURLToPath(import.meta.url)
//Nos da el string con la ruta, se deja a nivel del server
const __direname = path.dirname(__filename)

export default __dirname

