const express = require('express')
const router = express.Router()
const brandController = require('../controllers/BrandSupplier')
const checkOrigin = require('../middleware/origin')
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleauth')

//-----Gets
router.get('/brands',checkAuth,checkRoleAuth(['admin']),brandController.getbrands)
router.get('/brand/:id',checkAuth,checkRoleAuth(['admin']), brandController.brandId)
router.get('/searchbrand/:item',checkAuth,checkRoleAuth(['admin']),brandController.search)
//--Posts
router.post('/Newbrand',checkAuth,checkRoleAuth(['admin']),brandController.newbrand)
//---put
router.put('/updatebrand/:id',checkAuth,checkRoleAuth(['admin']),brandController.updatebrand)
//---delete
router.delete('/deletebrand/:id',checkAuth,checkRoleAuth(['admin']),brandController.deletebrand)

module.exports = router
