const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        default: ''
    },
    
    zip :{
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    state: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: "customer",
        enum: [
            "customer",
            "admin"
        ]
    }
},{collection:'Users'});



exports.Users = mongoose.model('Users', userSchema);
exports.userSchema = userSchema;
/*const User = mongoose.model('Users', userSchema);
module.exports = User;*/
