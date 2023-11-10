const express = require('express')
const router = express.Router()
const ControladorUsuario = require('../controllers/UserController')

router.post('/registro',ControladorUsuario.nuevoUsuario)
router.post('/login',ControladorUsuario.login)

module.exports = router


