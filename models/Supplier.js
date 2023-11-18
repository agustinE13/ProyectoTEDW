const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    id_supplier : Number,
    supplier: String
},
{collection:'Supplier'});
const Supplier = mongoose.model('Supplier', SupplierSchema);
module.exports=Supplier