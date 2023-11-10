const express = require('express')
const router = express.Router()
const ControladorProducto = require('../controllers/ControladorProducto')


router.get('/producto', ControladorProducto.productList)
router.get('/categorias',ControladorProducto.categories)
//buscar el producto por categoria pasando como parametro el id de la categoria
router.get('/productoCategoria/:categoria_id', ControladorProducto.ProductCategory)

//buscar el producto por nombre
router.get('/producto_Marca/:nombre_marca', ControladorProducto.BrandProduct)
//buscar el producto por id
router.get('/productoId/:id',ControladorProducto.productId)
//guardar producto
router.post('/productoNuevo',ControladorProducto.NewProduct)

//eliminar producto
router.delete('/eliminarProducto/:id',ControladorProducto.DeleteProduct)
//actualizar un producto
router.patch('/actualizarProducto/:id',ControladorProducto.UpdateProduct)


module.exports = router