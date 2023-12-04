//middleware to auth
const express = require('express')
const cookieParser = require('cookie-parser') 
const { verifyToken } = require('../libs/token')
const app = express()
app.use(cookieParser())

const checkAuth = async (req, res, next) => {
    try {
         //obtener el token desde la cookie 
        const token = req.cookies.jwt 
        const tokenData = await verifyToken(token)
        
        if (tokenData) {
            next()
        } else {
            res.status(409)
            res.send({ error: 'access denied' })
        }

    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({ error: 'access denied' })
    }

}

module.exports = checkAuth