const mongoose = require('mongoose')
const Product = require('../models/Product')
const Categoria = require('../models/Category')
const Marca = require('../models/Brand')

//mostrar todos los productos
const productList = async (req, res) => {
    try{
        const products = await Product.find().populate('category').populate('supplier').populate('brand')
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
        const productos_categoria = await Product
                                    .find({category:new mongoose.Types.ObjectId(req.params.categoria_id)})
                                    .populate('category ', 'category')
                                    .populate('supplier')
        res.send(productos_categoria)                            
    }catch(error){
        console.log(error)
    }
}
//mostrar producto por id
const productId = async (req, res) => {
    try {
        const result = await Product.findOne({ id_producto: req.params.id });

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
        const nombreMarca = req.params.nombre_marca.toLowerCase();

        // Buscar la marca por nombre y esperar el resultado
        const marca = await Marca.findOne({ brand: new RegExp('^' + nombreMarca, 'i') });
        if (!marca) {
            return res.status(404).send('No hay publicaciones que coincidan con tu búsqueda');
        }
        // Usar el ObjectId de la marca para buscar los productos y esperar el resultado
        const productos = await Product.find({ brand: marca._id });
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

        Newproduct.categoria = new mongoose.Types.ObjectId(req.body.categoria)
        Newproduct.proveedor = new mongoose.Types.ObjectId(req.body.proveedor)
        Newproduct.marca = new mongoose.Types.ObjectId(req.body.marca)
        const product = new Product(Newproduct)
        let savedProduct = await product.save()
        res.status(200).json({status: true, message: "correctly registered product"})
       
    } catch (error) {
        //console.log(error.errors)
        res.status(400).json({status: false, message:"error when adding product"})
    }
}

const UpdateProduct = async (req, res) => {
    Product.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
      .then(product => {
        if (product) {
          return res.status(200).json({ success: true, message: 'Updated product' });
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
        Product.findByIdAndRemove(req.params.id).then(product =>{
            if(product){
                return res.status(200).json({success: true, message: 'producto eliminado'})
            }else{
                return res.status(404).json({success: false, message: 'el producto no exite'})
            }
        }).catch(err=>{
            return res.status(500).json({success: false, error: err}) 
        })
}
const search = async (req, res) => {
    const { item } = req.params;
    
    try {
      //const brand = await Marca.findOne({ brand: new RegExp('^' + item, 'i') });
      const product = await Product.find({
        $or: [
          { name: new RegExp('^' + item, 'i') },
          //{ brand: brand._id },
        ],
      });
  
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  

module.exports = {productList,categories,ProductCategory,BrandProduct,NewProduct,DeleteProduct,UpdateProduct,productId,search}