const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    street: {
        type: String,
        require: true
    },
    zip: {
        type: Number,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
},{collection: 'Address' });
const Address = mongoose.model('Address', AddressSchema);
module.exports = Address