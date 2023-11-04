const express = require('express')
const router = express.Router()
const ControladorProducto = require('../controllers/ControladorProducto')


router.get('/producto', ControladorProducto.listarproductos)
router.get('/categorias',ControladorProducto.categorias)
//buscar el producto por categoria pasando como parametro el id de la categoria
router.get('/productoCategoria/:categoria_id', ControladorProducto.productosCategoria)

//buscar el producto por nombre
router.get('/producto_Marca/:nombre_marca', ControladorProducto.productoMarca)

module.exports = router