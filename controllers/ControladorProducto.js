const mongoose = require('mongoose')
const Product = require('../models/Producto')


const findAll = async (req, res) => {
    try{
        const products = await Product.find().populate('categoria').populate('proveedor').populate('marca')
        res.send(products)
    }catch(error){
        console.log(error)
    }
}
module.exports = {findAll}