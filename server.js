import express from 'express'
import handlebars from 'express-handlebars'
import { appendFile } from 'fs'
import __dirname from './dirname.js'

const express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Configuracion de Handlebars 
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main'
}))
app.set('views', `${__dirname}/src/views/`)
app.set('view engine', 'hbs')
app.use(express.static(`${__dirname}/src/public/`))
app.use('/', homeRouter)

//endpoint, ruta
app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts')
  })

app.listen(8080, () => console.log('Listening on port 8080'))


