import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './dirname.js'
import homeRouter from './src/routes/home.routes.js'
import ProductManager from './src/helpers/ProductManager.js'
import { Server } from 'socket.io'


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//inicio de websocket
const httpServer = app.listen(8080, () => console.log("Listening on port 8080"))
const io = new Server(httpServer)

//Handlebars 
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main'
}))
app.set('views', `${__dirname}/src/views/`)
app.set('view engine', 'hbs')
app.use(express.static(`${__dirname}/src/public/`))
app.use('/', homeRouter)

//Endpoint, ruta
app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts')
  })

//Persistencia 
let historial = ProductManager.getProducts()


//Servidor Socket
io.on('connection', (socket) => {
  console.log("Se ha conectado el cliente con id : !", socket.id)

//Carga de productos al inicio de pagina realtimeproducts
  socket.emit("arrayProductos", historial)


//Agregar producto
  socket.on("newProduct", (data) => {
    ProductManager.addProduct(data)
    io.emit("arrayProductos", historial)
    console.log("Se ha agregado un producto")
  })

//Eliminar producto
  socket.on("eliminarProducto", id => {
    ProductManager.deleteProduct(id)
    io.emit("arrayProductos", historial)
    console.log("Se ha eliminado un producto")
  })

})





