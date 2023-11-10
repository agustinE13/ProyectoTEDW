const express = require('express')
const cors = require('cors');
const mongoose = require('./libs/MongooseConnection')
const producto = require('./routes/RouteProducto')
const usuario = require('./routes/RouteUsuario')

const app = express()
const corsOptions = {
    origin: ['http://localhost:8000', 'http://127.0.0.1:4200', 'http://172.19.191.78:8000'],  // Puedes ajustar el origen permitido
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

app.use(express.json())
app.use(cors(corsOptions));

const apiprefix = process.env.API_PREFIX
app.use(apiprefix,producto)
app.use(apiprefix,usuario)

const port = process.env.PORT

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}!`) 

})







