const mongoose = require('mongoose')
const {Usuario} = require('../models/user');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser') 
const jwt = require('jsonwebtoken');
const { tokenSign } = require('../libs/token')

const nuevoUsuario = async(req,res)=>{
    const user = await Usuario.findOne({email: req.body.email})
    let usuario = new Usuario({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password,10),
        phone: req.body.phone,
        street: req.body.street,
        zip: req.body.zip,
        city: req.body.city,
        state: req.body.state,
    })
    if(user){
        return res.status(400).send("email already exist")
    }
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
        const payload = {
            _id: user.id,
            email: user.email,
            role: user.role
        }
        const token = jwt.sign(payload, secret,{expiresIn: '1d'})

        res.cookie("jwt", token)       
       
        res.status(200).json({success:true, data: payload, message: "success login"})
    } else {
       res.status(400).json({success: false, message: 'Wrong Password'})
    }

    
}
const profile = async(req,res)=>{
    

}

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

module.exports = {nuevoUsuario,login}