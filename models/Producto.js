const mongoose = require('mongoose');
const Category = require ('./Categoria');
const Proveedor = require ('./Proveedor');
const Marca = require ('./Marca');

const ProductoSchema = new mongoose.Schema({
    id_producto: Number,
    nombre: String,
    precio: Number,
    descripcion: String,
    color: [String],
    material: String,
    imagen : [String],
    atributos: {
        talla: [String],
        estilo: String
     },
     ficha_tecnica: {
        voltaje: String,
        potencia: String,
        dimensiones: String,
        peso: String,
        
     },
     inventario: {
        cantidad: Number,
        stock : Boolean
     },
     ofertas: {        
           tipo: String,
           valor: Number,
           descripcion: String        
     },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        require: true
    },
    proveedor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proveedor',
        require: true
    },
    marca:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marca',
        require: true
    }
},
{collection:'Producto'});
const Producto = mongoose.model('Producto', ProductoSchema);

module.exports=Producto