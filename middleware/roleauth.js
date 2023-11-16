const express = require('express')
const cookieParser = require('cookie-parser') 
const { verifyToken } = require('../libs/token')
const userModel = require('../models/user')
const app = express()
app.use(cookieParser())

const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        //obtener el token desde la cookie
        const token = req.cookies.jwt
        //validar el token
        const tokenData = await verifyToken(token)
        const userData = await userModel.Usuario.findById(tokenData._id)
        //console.log(userData)
        //verificar el rol
        if ([].concat(roles).includes(userData.role)) { //TODO:
            next()
        } else {
            res.status(409)
            res.send({ error: 'you do not have permissions' })
        }

    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({ error: 'access denied' })
    }

}

module.exports = checkRoleAuth