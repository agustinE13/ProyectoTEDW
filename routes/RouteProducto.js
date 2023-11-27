const express = require('express')
const router = express.Router()
const ControladorProducto = require('../controllers/ProductController')
const passport = require('passport')
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleauth')
const checkOrigin = require('../middleware/origin')


router.get('/products', ControladorProducto.productList)
router.get('/categories',ControladorProducto.categories)
router.get('/categories/:id',ControladorProducto.categoryId)
//buscar el producto por categoria pasando como parametro el id de la categoria
router.get('/productsCategory/:categoria_id', ControladorProducto.ProductCategory)

//buscar el producto por nombre
router.get('/productsBrand/:nombre_marca', ControladorProducto.BrandProduct)
//buscar el producto por id
router.get('/productsId/:id',ControladorProducto.productId)
//guardar producto
router.post('/Newproduct',checkAuth,checkRoleAuth(['admin']), ControladorProducto.NewProduct)
router.get('/search/:item',ControladorProducto.search)

//eliminar producto
router.delete('/deleteProduct/:id',checkAuth,checkRoleAuth(['admin']),ControladorProducto.DeleteProduct)
//actualizar un producto
router.patch('/updateProduct/:id',checkAuth,checkRoleAuth(['admin']),ControladorProducto.UpdateProduct)


module.exports = router