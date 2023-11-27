const mongoose = require('mongoose');
const Brand = require('../models/Brand');

const newbrand = async (req, res) => {
    try {
        const brandExist = await Brand.findOne({ brand: req.body.brand });

        if (brandExist) {
            return res.status(400).json({ success: false, message: "There is already a brand with that name" });
        }
        const newbrand = new Brand({
            brand: req.body.brand
        });
        const savedbrand = await newbrand.save();
        res.status(200).json({ success: true, message: "Added brand"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getbrands = async (req, res) => {
    try {
        const brands = await Brand.find()
        res.send(brands)
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const updatebrand = async (req,res)=>{
    Brand.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
      .then(brand => {
        if (brand) {
          return res.status(200).json({ success: true, message: 'Updated brand' });
        } else {
          return res.status(404).json({ success: false, message: 'brand did not update' });
        }
      })
      .catch(err => {
        return res.status(500).json({ success: false, error: err });
      });
}

const deletebrand = async ( req,res)=>{
    Brand.findByIdAndRemove(req.params.id).then(brand =>{
        if(brand){
            return res.status(200).json({success: true, message: 'removed brand'})
        }else{
            return res.status(404).json({success: false, message: 'brand does not exist'})
        }
    }).catch(err=>{
        return res.status(500).json({success: false, error: err}) 
    })
}

const brandId = async (req,res)=>{
    try {
        const result = await Brand.findOne({ _id: req.params.id });

        if (result) {
            res.send(result);
        } else {
            res.status(404).json({ success: false, message: 'Brand was not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}
const search = async (req, res) => {
    const { item } = req.params;
    
    try {
      const brand = await Brand.find({
        $or: [
          { brand: new RegExp('^' + item, 'i') },
        ],
      });
  
      res.json(brand);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


module.exports = {newbrand,getbrands,updatebrand,deletebrand,brandId,search}