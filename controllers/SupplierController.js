const mongoose = require('mongoose')
const Supplier = require('../models/Supplier')

const newsupplier= async (req,res)=>{
    try {
        const supplierexist = await Supplier.findOne({supplier: req.body.supplier})
        let supplier = new Supplier({
            supplier: req.params.supplier
        })
        if(supplierexist){
            res.status(400).send("There is already a supplier with that name")
        }
       supplier = await supplier.save()
       res.status(200).json({sucess: true, message: "added supplier"})
    } catch (error) {
         res.status(500).json({ success: false, message: "Internal server error" });
    }
}
const getsuppliers = async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

module.exports = {newsupplier,getsuppliers}