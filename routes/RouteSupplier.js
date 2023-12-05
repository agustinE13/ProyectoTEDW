const express = require('express')
const router = express.Router()
const supplierController = require('../controllers/SupplierController')
const checkOrigin = require('../middleware/origin')
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleauth')

//-----Gets
router.get('/suppliers',checkAuth,checkRoleAuth(['admin']),supplierController.getsuppliers)
router.get('/supplier/:id',checkAuth,checkRoleAuth(['admin']), supplierController.supplierId)
router.get('/searchsupplier/:item',checkAuth,checkRoleAuth(['admin']),supplierController.search)
//--Posts
router.post('/Newsupplier',checkAuth,checkRoleAuth(['admin']),supplierController.newsupplier)
//---put
router.put('/updatesupplier/:id',checkAuth,checkRoleAuth(['admin']),supplierController.updatesupplier)
//---delete
router.delete('/deletesupplier/:id',checkAuth,checkRoleAuth(['admin']),supplierController.deletesupplier)

module.exports = router
