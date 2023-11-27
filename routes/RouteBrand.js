const express = require('express')
const router = express.Router()
const brandController = require('../controllers/BrandSupplier')
const checkOrigin = require('../middleware/origin')
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleauth')

//-----Gets
router.get('/brands',brandController.getbrands)
router.get('/brand/:id', brandController.brandId)
router.get('/searchbrand/:item',brandController.search)
//--Posts
router.post('/Newbrand',brandController.newbrand)
//---put
router.put('/updatebrand/:id',brandController.updatebrand)
//---delete
router.delete('/deletebrand/:id',brandController.deletebrand)

module.exports = router
