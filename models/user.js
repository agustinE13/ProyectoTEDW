const mongoose = require('mongoose');
const address = require('./Address')

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
    addresses:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Address',
        require:true
    }],
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
