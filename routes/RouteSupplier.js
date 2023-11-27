const express = require('express')
const router = express.Router()
const supplierController = require('../controllers/SupplierController')
const checkOrigin = require('../middleware/origin')
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleauth')
const { route } = require('./RouteUsuario')

router.post('/Newsupplier',supplierController.newsupplier)

module.exports = router
