const express = require('express')
const router = express.Router()
const supplierController = require('../controllers/SupplierController')
const checkOrigin = require('../middleware/origin')
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleauth')

//-----Gets
router.get('/suppliers',supplierController.getsuppliers)
router.get('/supplier/:id', supplierController.supplierId)
router.get('/searchsupplier/:item',supplierController.search)
//--Posts
router.post('/Newsupplier',supplierController.newsupplier)
//---put
router.put('/updatesupplier/:id',supplierController.updatesupplier)
//---delete
router.delete('/deletesupplier/:id',supplierController.deletesupplier)

module.exports = router
