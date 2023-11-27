const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    brand:{
        type: String,
        require: true
    }
},
{collection:'Brand'});
const Brand = mongoose.model('Brand', BrandSchema);
module.exports = Brand