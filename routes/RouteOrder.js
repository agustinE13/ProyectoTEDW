const express = require('express')
const router = express.Router()
const controllerOrder = require('../controllers/OrderController')

router.post('/neworder',controllerOrder.newOrder)
router.get('/allorders',controllerOrder.allOrders)


module.exports = router