const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    id_category : Number,
    category: String
},
{collection:'Category'});
const Category = mongoose.model('Category', CategorySchema);
module.exports=Category