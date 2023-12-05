
const express = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser') 
const { verifyToken } = require('../libs/token')
const app = express()
app.use(cookieParser())

const checkOrigin = async (req, res, next) => {
    try {
        // Obtener el token desde la cookie
        const token = req.headers.authorization.split(' ')[1]; 
        
        // Verificar si hay un token en la cookie
        if (!token) {
            res.status(401).json({ error: 'login to coninue' });
            return;
        }
        //validar que el token haya sido firmado por nosotros
        const isValidToken = await verifyToken(token);

        if (isValidToken) {
            next();
        } else {
            res.status(401).json({ error: 'invalid token.' });
        }

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'internal servewr error' });
    }
};


module.exports = checkOrigin;
