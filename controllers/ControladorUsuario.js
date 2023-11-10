const mongoose = require('mongoose')
const {Usuario} = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const nuevoUsuario = async(req,res)=>{
    let usuario = new Usuario({
        nombre: req.body.nombre,
        apellidoP: req.body.apellidoP,
        apellidoM: req.body.apellidoM,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password,10),
        telefono: req.body.telefono,
        isAdmin: req.body.isAdmin,
        calle: req.body.calle,
        apartment: req.body.apartment,
        codigo_postal: req.body.codigo_postal,
        ciudad: req.body.ciudad,
    })
    usuario = await usuario.save();
    if(!usuario)
    return res.status(400).send('The user cannot be created!')

    res.send(usuario);
}

const login = async (req,res) => {
    const user = await Usuario.findOne({email: req.body.email})
    const secret = process.env.SECRET;
    if(!user) {
        return res.status(400).json({success: false, message: 'Username does not exist'})
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin,
            },
            secret,
            {expiresIn: '1d'}
        )
       
        res.status(200).send({user: user.email , token: token}) 
    } else {
       res.status(400).json({success: false, message: 'Wrong Password'})
    }

    
}

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

module.exports = {nuevoUsuario,login}

