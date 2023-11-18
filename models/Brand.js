const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    id_brand : Number,
    marca: String
},
{collection:'Brand'});
const Brand = mongoose.model('Brand', BrandSchema);
module.exports = Brand