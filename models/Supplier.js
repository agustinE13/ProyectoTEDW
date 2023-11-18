const mongoose = require('mongoose');

const ProveedorSchema = new mongoose.Schema({
    id_proveedor : Number,
    proveedor: String
},
{collection:'Proveedor'});
const Proveedor = mongoose.model('Proveedor', ProveedorSchema);
module.exports=Proveedor