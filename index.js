const express = require('express')
const mongoose = require('./libs/MongooseConnection')
const producto = require('./routes/RouteProducto')
const app = express()
app.use(express.json())
const apiprefix = process.env.API_PREFIX
app.use(apiprefix,producto)

const port = process.env.PORT

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}!`) 

})







