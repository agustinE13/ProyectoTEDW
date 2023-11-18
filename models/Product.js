const mongoose = require('mongoose');
const Category = require ('./Category');
const Supplier = require ('./Supplier');
const Brand = require ('./Brand');

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    descripcition: String,
    color: [String],
    material: String,
    images : [String],
    attributes: [String],
    inventory: {
        quantity: Number,
        stock : Boolean
     },
     offers: {        
           type: String,
           value: Number,
           description: String        
     },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    supplier:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        require: true
    },
    brand:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        require: true
    }
},
{collection:'Product'});
const Product = mongoose.model('Product', ProductSchema);

module.exports=Product