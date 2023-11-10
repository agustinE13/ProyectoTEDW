const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellidoP: {
        type: String,
        required: true,
    },
    apellidoM: {
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
    telefono: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    calle: {
        type: String,
        default: ''
    },
    estado: {
        type: String,
        default: ''
    },
    codigo_postal :{
        type: String,
        default: ''
    },
    ciudad: {
        type: String,
        default: ''
    }
},{collection:'Usuario'});



exports.Usuario = mongoose.model('Usuario', userSchema);
exports.userSchema = userSchema;
