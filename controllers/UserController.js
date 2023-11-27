const mongoose = require('mongoose')
const {Users} = require('../models/user');
const History = require('../models/History')
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser') 
const jwt = require('jsonwebtoken');
const { tokenSign } = require('../libs/token')
const sendemail = require('../middleware/sendEmail')

const newUser = async(req,res)=>{
    const user = await Users.findOne({email: req.body.email})
    let usuario = new Users({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password,10),
        phone: req.body.phone,
    })
    if(user){
        return res.status(400).send("email already exist")
    }
    usuario = await usuario.save();
    
    if(!usuario)  
    return res.status(400).send('The user cannot be created!')

    res.send(usuario);
}

const login = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    const secret = process.env.SECRET;

    if (!user) {
      return res.status(400).json({ success: false, message: 'Username does not exist' });
    }
    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const token = await tokenSign(user);
      res.cookie("jwt", token);
      res.status(200).json({ success: true, message: "success login" });
    } else {
      res.status(400).json({ success: false, message: 'Wrong Password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


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
        const user = await Users.findOne({_id:req.params.id}).select("-role -__v")
        if (user) {
            res.json({ success: true, data: user });
        } else {
            res.status(404).json({ success: false, message: 'user not found' });
        }
    } catch(err){

    }

}
const editprofile = async(req,res)=>{

    Users.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
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
        const users = await Users.find().select('-__v -role -passwordHash')
        res.status(200).send(users)        
    } catch (error) {
        res.status(500).json({ success: false, message: 'server internal error' });
    }
}

const forgotpassword = async(req, res) =>{
    try {
        const email = req.body.email
        const user = await Users.findOne({email: req.body.email},'email')
        if(user){
            const token = jwt.sign({email, _id:user.id},process.env.SECRET, { expiresIn: '15m' })
            //console.log(token.Date)
            //const resetLink = `http://localhost:3000${process.env.API_PREFIX}/reset-password/${token}`
            const resetLink = `http://localhost:4200/reset-password/${token}`

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
      //console.log(password)
      //console.log(verifyPassword)
        const _id = decoded._id
        console.log(_id)
        Users.findOneAndUpdate({ _id },{ $set: {passwordHash: bcrypt.hashSync(req.body.password, 10) }},{ new: true })
      .then(user => {
        if (user) {
          //console.log(user)
          return res.status(200).json({ success: true, message: 'Updated password!' })
        } else {
          return res.status(404).json({ success: false, message: 'password was not updated correctly' })
        }
      })
      .catch(err => {
        return res.status(500).json({ success: false, error: err })
      });
       
    }else{
      res.status(400).json({ error: "Passwords do not match" });
    }
        
  });
}
const history = async(req,res)=>{
  History.find({ usuarioId: usuarioId })
  .populate('productos') // Si quieres obtener detalles completos de los productos
  .sort('-fechaCompra')  // Ordenar por fecha de compra descendente
  .exec((err, historial) => {
    if (err) {
      console.error('Error al recuperar el historial de compras:', err);
      res.status(500).json({ error: 'Error al recuperar el historial de compras.' });
    } else {
      res.json({ historialCompras: historial });
    }
  });
}

const logout = (req,res)=>{
  
  res.cookie('jwt', '', {
    expires: new Date(0) 
  });

  res.status(200).json({ success:true });
}

module.exports = {newUser,login,profile,editprofile,allUsers,forgotpassword,resetPassword,logout}