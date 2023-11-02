const mongoose = require('mongoose');

const MarcaSchema = new mongoose.Schema({
    id_marca : Number,
    marca: String
},
{collection:'Marca'});
const Marca = mongoose.model('Marca', MarcaSchema);
module.exports = Marca