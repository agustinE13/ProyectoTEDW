const mongoose = require('mongoose')
const Product = require('../models/Product')
const Categoria = require('../models/Category')
const Marca = require('../models/Brand')
const {uploadToS3} = require('../middleware/bucket')
const {getbuckets}=require('../middleware/bucket')
const imagenes = require('../middleware/bucket')

//mostrar todos los productos
const productList = async (req, res) => {
    try {
        const products = await Product.find().populate('category').populate('supplier').populate('brand')
        res.send(products)
    } catch (error) {
        console.log(error)
    }
}

//mostrar los productos segun su categoria
const ProductCategory = async (req, res) => {
    try {
        const productos_categoria = await Product
            .find({ category: new mongoose.Types.ObjectId(req.params.categoria_id) })
            .populate('category', 'category')
            .populate('supplier')
        res.send(productos_categoria)
    } catch (error) {
        console.log(error)
    }
}
//mostrar producto por id
const productId = async (req, res) => {
    try {
        const result = await Product.findOne({ _id: req.params.id });

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
    let newProduct = req.body;

    newProduct.categoria = new mongoose.Types.ObjectId(req.body.categoria);
    newProduct.proveedor = new mongoose.Types.ObjectId(req.body.proveedor);
    newProduct.marca = new mongoose.Types.ObjectId(req.body.marca);

    const product = new Product(newProduct);
    let savedProduct = await product.save();

    res.status(200).json({ status: true, message: 'Producto registrado correctamente' });
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    res.status(400).json({ status: false, message: 'Error al agregar el producto' });
  }
};

  

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


const DeleteProduct = async (req, res) => {
    //const result = await Producto.findOneAndDelete( { "id_producto":parseInt(req.params.id) });
    Product.findByIdAndRemove(req.params.id).then(product => {
        if (product) {
            return res.status(200).json({ success: true, message: 'producto eliminado' })
        } else {
            return res.status(404).json({ success: false, message: 'el producto no exite' })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
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


//-------CATEGORIA-----
//mostrar todas las categorias
const categories = async (req, res) => {
    try {
        const catego = await Categoria.find()
        res.send(catego)
    } catch (error) {
        console.log(error)
    }
}

//MOSTRAR CATEGORIA POR ID
const categoryId = async (req, res) => {
    try {
        const result = await Categoria.findOne({ _id: req.params.id });
        if (result) {
            res.json({ success: true, category: result });
        }
        else {
            res.status(404).json({ success: false, message: 'La categoria no se encontró' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Error en el servidor' });
    }
}

//ELIMINAR CATEGORIA
const Deletecategory = async (req, res) => {
    //const result = await Producto.findOneAndDelete( { "id_producto":parseInt(req.params.id) });
    Categoria.findByIdAndRemove(req.params.id).then(category => {
        if (category) {
            return res.status(200).json({ success: true, message: 'deleted category' })
        } else {
            return res.status(404).json({ success: false, message: 'category does not exist' })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
}

//nueva categoria
const newcategory = async (req, res) => {
    try {
        const categoryExist = await Categoria.findOne({ categoria: req.body.categoria });

        if (categoryExist) {
            return res.status(400).json({ success: false, message: "There is already a category with that name" });
        }
        const newCategory = new Categoria({
            categoria: req.body.categoria
        });
        const savedSupplier = await newCategory.save();
        res.status(200).json({ success: true, message: "Added supplier"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

///Edit categoria
const updateCategory = async (req,res)=>{
    Categoria.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
      .then(category => {
        console.log("Update Data:", req.body);
        console.log(category)
        if (category) {
          return res.status(200).json({ success: true, message: 'Updated category' });
        } else {
          return res.status(404).json({ success: false, message: 'Category did not update' });
        }
      })
      .catch(err => {
        return res.status(500).json({ success: false, error: err });
      });
}



module.exports = {
    productList, categories, ProductCategory, BrandProduct,
    NewProduct, DeleteProduct, UpdateProduct, productId, search, categoryId, 
    Deletecategory, newcategory,updateCategory
}