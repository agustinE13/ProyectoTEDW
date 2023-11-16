const express = require('express')
const router = express.Router()
const ControladorUsuario = require('../controllers/UserController')

router.post('/users/register',ControladorUsuario.nuevoUsuario)
router.post('/users/login',ControladorUsuario.login)

module.exports = router


