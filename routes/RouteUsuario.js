const express = require('express')
const router = express.Router()
const ControladorUsuario = require('../controllers/UserController')

router.post('/register',ControladorUsuario.nuevoUsuario)
router.post('/login',ControladorUsuario.login)

module.exports = router


