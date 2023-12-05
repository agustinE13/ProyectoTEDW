const express = require('express')
const router = express.Router()
const ControladorUsuario = require('../controllers/UserController')
const checkOrigin = require('../middleware/origin')
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleauth')

router.get('/admin/users',checkAuth,checkRoleAuth(['admin']),ControladorUsuario.allUsers)
router.get('/users/profile/:id',checkOrigin,ControladorUsuario.profile)
router.post('/users/register',ControladorUsuario.newUser)
router.post('/users/login',ControladorUsuario.login)
router.post('/forgot-password',ControladorUsuario.forgotpassword)
router.post('/reset-password/:token',ControladorUsuario.resetPassword)
router.put('/users/editprofile/:id',checkOrigin,ControladorUsuario.editprofile)
router.patch('/changepassword/:id',checkOrigin,ControladorUsuario.changePassword)
router.post('/users/logout',checkOrigin,ControladorUsuario.logout)



router.post('/newAddress/:id',ControladorUsuario.newAddress)
router.get('/myAddresses/:id',ControladorUsuario.AddressUSer)

module.exports = router


