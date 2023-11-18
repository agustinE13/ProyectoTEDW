const mongoose = require('mongoose')
const {Usuario} = require('../models/user');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser') 
const jwt = require('jsonwebtoken');
const { tokenSign } = require('../libs/token')
const sendemail = require('../middleware/sendEmail')

const newUser = async(req,res)=>{
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
        /*const payload = {
            _id: user.id,
            email: user.email,
            role: user.role
        }*/
        const token = await tokenSign(user)
        //const token = jwt.sign(payload, secret,{expiresIn: '1d'})

        res.cookie("jwt", token)       
       
        res.status(200).json({success:true, message: "success login"})
    } else {
       res.status(400).json({success: false, message: 'Wrong Password'})
    }

    
}

const profile = async(req,res)=>{
   /*Usuario.findOne({id: req.params._id}).select("-role").select("-__v").then(user=>{
    if(user){
        return res.json({success: true, data: user})
    }else{
        return res.status(404).json({ success: false, message: 'Profile was not updated correctly' });
    }
   })
   .catch(err => {
    return res.status(500).json({ success: false, error: err });
  })*/
    try{ 
        const user = await Usuario.findOne({id:req.params._id}).select("-role -__v")
        if (user) {
            res.json({ success: true, data: user });
        } else {
            res.status(404).json({ success: false, message: 'user not found' });
        }
    } catch(err){

    }

}
const editprofile = async(req,res)=>{

    Usuario.findOneAndUpdate({ id: req.params._id }, { $set: req.body }, { new: true })
      .then(user => {
        if (user) {
          return res.status(200).json({ success: true, message: 'Updated profile!' });
        } else {
          return res.status(404).json({ success: false, message: 'Profile was not updated correctly' });
        }
      })
      .catch(err => {
        return res.status(500).json({ success: false, error: err });
      });
}

const allUsers = async(req,res)=>{
    try {
        const users = await Usuario.find().select('-__v -role -passwordHash')
        res.status(200).send(users)        
    } catch (error) {
        res.status(500).json({ success: false, message: 'server internal error' });
    }
}

const forgotpassword = async(req, res) =>{
    try {
        const email = req.body.email
        const user = await Usuario.findOne({email: req.body.email},'email')
        if(user){
            const token = jwt.sign({email, _id:user.id},process.env.SECRET, { expiresIn: '15m' })
            const resetLink = `http://localhost:3000${process.env.API_PREFIX}/reset-password/${token}`
            const html = `
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>El enlace expira en 15 minutos</p>`

    sendemail(email, 'Restore password', html)
      .then(() => {
        res.json({ message: 'An email has been sent with instructions to reset your password.' })
      })
      .catch((error) => {
        //console.error(error)
        res.status(500).json({ error: 'Failed to send email.' })
      });
        }else{
            return res.status(404).json({ success: false, message: 'username not found',user: user })

        }
    } catch (error) {
        
        res.status(500).json({ success: false, message: 'server internal error'});
        console.error(error);
    }
}
const resetPassword = async(req,res)=> {
    const { token } = req.params
    const  password  = req.body.password
    const  verifyPassword = req.body.verifyPassword    

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    
    if (err) {
      return res.status(401).json({ error: 'Invalid or expired token.' })
    }
    if(password==verifyPassword){
        const _id = decoded._id
        console.log(_id)
        Usuario.findOneAndUpdate({ _id },{ $set: {passwordHash: bcrypt.hashSync(req.body.password, 10) }},{ new: true })
      .then(user => {
        if (user) {
          return res.status(200).json({ success: true, message: 'Updated password!' })
        } else {
          return res.status(404).json({ success: false, message: 'password was not updated correctly' })
        }
      })
      .catch(err => {
        return res.status(500).json({ success: false, error: err })
      });
       
    }else{
        res.send("Passwords do not match")
    }
        
  });
}
const history = async(req,res)=>{
    
}





module.exports = {newUser,login,profile,editprofile,allUsers,forgotpassword,resetPassword}