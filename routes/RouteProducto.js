const express = require('express')
const router = express.Router()
const ControladorProducto = require('../controllers/ControladorProducto')

router.get('/', (req, res) => res.send('Hello World!'))

router.get('/producto', ControladorProducto.findAll)

module.exports = router