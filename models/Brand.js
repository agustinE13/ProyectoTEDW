const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    brand: String
},
{collection:'Brand'});
const Brand = mongoose.model('Brand', BrandSchema);
module.exports = Brand