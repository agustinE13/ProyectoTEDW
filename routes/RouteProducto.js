const express = require('express')
const router = express.Router()
const ControladorProducto = require('../controllers/ProductController')
const passport = require('passport')


router.get('/products', ControladorProducto.productList)
router.get('/categorias',ControladorProducto.categories)
//buscar el producto por categoria pasando como parametro el id de la categoria
router.get('/productsCategory:categoria_id', ControladorProducto.ProductCategory)

//buscar el producto por nombre
router.get('/productsBrand/:nombre_marca', ControladorProducto.BrandProduct)
//buscar el producto por id
router.get('/productsId/:id',ControladorProducto.productId)
//guardar producto
router.post('/productsNew',ControladorProducto.NewProduct)

//eliminar producto
router.delete('/productsDelete/:id',ControladorProducto.DeleteProduct)
//actualizar un producto
router.patch('/productsUpdate/:id',ControladorProducto.UpdateProduct)


module.exports = router