const mongoose = require('mongoose')
const Producto = require('../models/Producto')
const Categoria = require('../models/Categoria')
const Marca = require('../models/Marca')

//mostrar todos los productos
const listarproductos = async (req, res) => {
    try{
        const products = await Producto.find().populate('categoria').populate('proveedor').populate('marca')
        res.send(products)
    }catch(error){
        console.log(error)
    }
}

//mostrar todas las categorias
const categorias = async (req, res) => {
    try{
        const catego = await Categoria.find()
        res.send(catego)
    }catch(error){
        console.log(error)
    }
}
const productosCategoria = async (req,res) =>{
    try{
        const productos_categoria = await Producto
                                    .find({categoria:new mongoose.Types.ObjectId(req.params.categoria_id)})
                                    .populate('categoria', 'categoria')
                                    .populate('proveedor').select('-_id')
        res.send(productos_categoria)                            
    }catch(error){
        console.log(error)
    }
}
const productoMarca = async (req, res) => {
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





module.exports = {listarproductos,categorias,productosCategoria,productoMarca}