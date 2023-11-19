const mongoose = require('mongoose');
const Category = require ('./Category');
const Supplier = require ('./Supplier');
const Brand = require ('./Brand');

const ProductSchema = new mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    price: Number,
    description: {
        type:String,
        require:true
    },
    color: [String],
    material: String,
    images : [String],
    attributes: [String],
    inventory: {
        quantity: Number,
        stock : Boolean
     },
     offers: {
        type : {
            type: String,
            default: ' '
        },
        value : {
            type: Number,
            default: 0
        },
        description : {
            type: String,
            default: ' '
        }
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