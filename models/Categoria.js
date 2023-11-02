const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
    id_categoria : Number,
    categoria: String
},
{collection:'Categoria'});
const Categoria = mongoose.model('Categoria', CategoriaSchema);
module.exports=Categoria