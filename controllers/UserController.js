const mongoose = require('mongoose')
const {Users} = require('../models/user');
const History = require('../models/History')
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser') 
const jwt = require('jsonwebtoken');
const { tokenSign } = require('../libs/token')
const sendemail = require('../middleware/sendEmail')
const Address = require('../models/Address')

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
      res.cookie("jwt", token,  { sameSite: 'None', secure: true });
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
        const user = await Users.findOne({_id:req.params.id}).select("-role -__v -passwordHash")
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

const changePassword = async(req,res)=>{
  
  const lastPassword = req.body.lastPassword
  const newPassword = req.body.newPassword
  const verifyPassword = req.body.verifyPassword

  try {
    const exist = await Users.findOne({ _id: req.params.id })

  if(exist){
    if(exist.passwordHash == bcrypt.hashSync(req.body.lastpassword, 10)){
      if(newPassword==verifyPassword){
        Users.findOneAndUpdate({ _id },{ $set: {passwordHash: bcrypt.hashSync(req.body.newPassword, 10) }},{ new: true })
        .then(user => {
          if (user) {
            return res.status(200).json({ success: true, message: 'Updated password!' })
          } else {
            return res.status(404).json({ success: false, message: 'password was not updated correctly' })
          }
        })
      }else{
        res.status(400).json({ error: "Passwords do not match" });
      }
    }else{
      res.status(400).json({ error: "Your last password do not match" });
    }
  }
  } catch (error) {
    
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

//-------------------DIRECCIONES--------------
const newAddress = async(req,res)=>{
  const userId = req.params.id;
  const nuevaDireccion = req.body;

  try {
    const direccionCreada = await Address.create(nuevaDireccion);
    const usuario = await Users.findByIdAndUpdate(
      userId,
      { $push: { addresses: direccionCreada._id } },
      { new: true }
    );

    res.json({ usuario, nuevaDireccion: direccionCreada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la dirección' });
  }
}

const AddressUSer = async(req,res)=>{
  const userId = req.params.id;
  try {
    const usuario = await Users.findById(userId).populate('addresses').select('-__v -passwordHash -lastname -role -phone -email');
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las direcciones' });
  }
} 

const updateAddress = async(req,res)=>{

  const direccionId = req.params.idAddress;
  const nuevaInformacionDireccion = req.body;

  try {
    const direccionActualizada = await Address.findByIdAndUpdate(
      direccionId,
      { $set: nuevaInformacionDireccion },
      { new: true }
    );

    res.status(200).json({ success:"true", data:direccionActualizada});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la dirección' });
  }
}
const deleteAddres = async(req,res)=>{
  const userId = req.params.userId;
  const direccionId = req.params.direccionId;

  try {
    await Address.findByIdAndRemove(direccionId);
    const usuario = await Users.findByIdAndUpdate(
      userId,
      { $pull: { addresses: direccionId } },
      { new: true }
    );

    res.json({ success:true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la dirección' });
  }
}

const getAddresbyId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const addressId = req.params.addressId;
    const user = await Users.findOne({ _id: userId, 'addresses': addressId })
      .populate('addresses');

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado o dirección no asociada al usuario.' });
    }

    const foundAddress = user.addresses.find(address => address._id.equals(addressId));

    if (!foundAddress) {
      return res.status(404).json({ message: 'Dirección no encontrada para el usuario especificado.' });
    }

    return res.json(foundAddress);
  } catch (error) {
    console.error('Error al obtener la dirección:', error);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
}

module.exports = {newUser,login,profile,editprofile,allUsers,
  forgotpassword,resetPassword,logout,
changePassword,newAddress,AddressUSer,
updateAddress, deleteAddres,getAddresbyId}