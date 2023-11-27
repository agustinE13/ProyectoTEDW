const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    supplier: {
        type: String,
        require: true
    }
},
{collection:'Supplier'});
const Supplier = mongoose.model('Supplier', SupplierSchema);
module.exports=Supplier