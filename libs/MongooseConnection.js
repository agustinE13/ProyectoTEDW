const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.DB_NAME)

const connectionObj = mongoose.connection

connectionObj.on('connected', ()=> {
    console.log('MongoDB connection successful')
})

connectionObj.on('error', ()=> {
    console.log('MongoDB connection failed...')
})