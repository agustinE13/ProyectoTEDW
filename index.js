const express = require('express')
const cors = require('cors');
const mongoose = require('./libs/MongooseConnection')
const cookieParser = require('cookie-parser') 
const session = require('express-session')
const producto = require('./routes/RouteProducto')
const usuario = require('./routes/RouteUsuario');
const passport = require('passport');
const authJwt = require('./libs/jwt')
const apiprefix = process.env.API_PREFIX
const port = process.env.PORT
const app = express()
const corsOptions = {
    origin: ['http://localhost:8000', 'http://127.0.0.1:4200', 'http://172.19.191.78:8000'],  // Puedes ajustar el origen permitido
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  //middleware
app.use(express.json())
app.use(cors(corsOptions));
//administraar cookies
app.use(authJwt())
app.use(cookieParser())
app.use(passport.initialize())
//routes
app.use(apiprefix,producto)
app.use('/tienda/v1/users', usuario)



app.listen(port, async () => {  
    console.log(`Example app listening on port ${port}!`) 

})







