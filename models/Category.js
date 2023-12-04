const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    categoria: String
},
{collection:'Category'});
const Category = mongoose.model('Category', CategorySchema);
module.exports=Category