const mongoose = require('mongoose');
const Supplier = require('../models/Supplier');

const newsupplier = async (req, res) => {
    try {
        const supplierExist = await Supplier.findOne({ supplier: req.body.supplier });

        if (supplierExist) {
            return res.status(400).json({ success: false, message: "There is already a supplier with that name" });
        }
        const newSupplier = new Supplier({
            supplier: req.body.supplier
        });
        const savedSupplier = await newSupplier.save();
        res.status(200).json({ success: true, message: "Added supplier"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getsuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find()
        res.send(suppliers)
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const updatesupplier = async (req,res)=>{
    Supplier.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
      .then(supplier => {
        if (supplier) {
          return res.status(200).json({ success: true, message: 'Updated supplier' });
        } else {
          return res.status(404).json({ success: false, message: 'supplier did not update' });
        }
      })
      .catch(err => {
        return res.status(500).json({ success: false, error: err });
      });
}

const deletesupplier = async ( req,res)=>{
    Supplier.findByIdAndRemove(req.params.id).then(supplier =>{
        if(supplier){
            return res.status(200).json({success: true, message: 'removed supplier'})
        }else{
            return res.status(404).json({success: false, message: 'supplier does not exist'})
        }
    }).catch(err=>{
        return res.status(500).json({success: false, error: err}) 
    })
}

const supplierId = async (req,res)=>{
    try {
        const result = await Supplier.findOne({ _id: req.params.id });

        if (result) {
            res.send(result);
        } else {
            res.status(404).json({ success: false, message: 'Supplier was not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}
const search = async (req, res) => {
    const { item } = req.params;
    
    try {
      const supplier = await Supplier.find({
        $or: [
          { supplier: new RegExp('^' + item, 'i') },
        ],
      });
  
      res.json(supplier);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


module.exports = {newsupplier,getsuppliers,updatesupplier,deletesupplier,supplierId,search}