const mongoose = require('mongoose')
const Producto = require('../models/Producto')
const Categoria = require('../models/Categoria')
const Marca = require('../models/Marca')

//mostrar todos los productos
const productList = async (req, res) => {
    try{
        const products = await Producto.find().populate('categoria').populate('proveedor').populate('marca')
        res.send(products)
    }catch(error){
        console.log(error)
    }
}

//mostrar todas las categorias
const categories = async (req, res) => {
    try{
        const catego = await Categoria.find()
        res.send(catego)
    }catch(error){
        console.log(error)
    }
}
//mostrar los productos segun su categoria
const ProductCategory = async (req,res) =>{
    try{
        const productos_categoria = await Producto
                                    .find({categoria:new mongoose.Types.ObjectId(req.params.categoria_id)})
                                    .populate('categoria', 'categoria')
                                    .populate('proveedor')
        res.send(productos_categoria)                            
    }catch(error){
        console.log(error)
    }
}
//mostrar producto por id
const productId = async (req, res) => {
    try {
        const result = await Producto.findOne({ id_producto: req.params.id });

        if (result) {
            res.json({ success: true, product: result });
        } else {
            res.status(404).json({ success: false, message: 'El producto no se encontró' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Error en el servidor' });
    }
}

//mostrar los productos segun la marca
const BrandProduct = async (req, res) => {
    try {
        // Convertir el nombre de la marca a minúsculas para una búsqueda insensible a mayúsculas/minúsculas
        const nombreMarca = req.params.nombre_marca.toUpperCase();

        // Buscar la marca por nombre y esperar el resultado
        const marca = await Marca.findOne({ marca: new RegExp('^' + nombreMarca, 'i') });
        if (!marca) {
            return res.status(404).send('No hay publicaciones que coincidan con tu búsqueda');
        }
        // Usar el ObjectId de la marca para buscar los productos y esperar el resultado
        const productos = await Producto.find({ marca: marca._id });
        res.send(productos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

//registrar un nuevo producto
const NewProduct = async (req, res) => {
    try {
        let Newproduct = req.body

        const p = await Producto.find().sort({"id_producto":-1}).limit(1)
        Newproduct.id_producto = parseInt(p[0].id_producto) + 1

        Newproduct.categoria = new mongoose.Types.ObjectId(req.body.categoria)
        Newproduct.proveedor = new mongoose.Types.ObjectId(req.body.proveedor)
        Newproduct.marca = new mongoose.Types.ObjectId(req.body.marca)
        const product = new Producto(Newproduct)
        let savedProduct = await product.save()
        res.send(savedProduct)
       
    } catch (error) {
        //console.log(error.errors)
        res.status(400).send(error.errors)
    }
}

const UpdateProduct = async (req, res) => {
    Producto.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
      .then(product => {
        if (product) {
          return res.status(200).json({ success: true, message: 'Producto actualizado', product });
        } else {
          return res.status(404).json({ success: false, message: 'El producto no se actualizó correctamente' });
        }
      })
      .catch(err => {
        return res.status(500).json({ success: false, error: err });
      });
  }
  

const DeleteProduct = async(req,res)=>{
    //const result = await Producto.findOneAndDelete( { "id_producto":parseInt(req.params.id) });
        Producto.findByIdAndRemove(req.params.id).then(product =>{
            if(product){
                return res.status(200).json({success: true, message: 'producto eliminado'})
            }else{
                return res.status(404).json({success: false, message: 'el producto no exite'})
            }
        }).catch(err=>{
            return res.status(500).json({success: false, error: err}) 
        })
}

module.exports = {productList,categories,ProductCategory,BrandProduct,NewProduct,DeleteProduct,UpdateProduct,productId}