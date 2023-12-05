const mongoose = require('mongoose')
const Product = require('../models/Product')
const { Users } = require('../models/user');
const Order = require('../models/Pedido')

const allOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user')
            .populate('cart.items.products').populate('user.address')
            .select('-passwordHash');

        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

const orderbyID=async (req,res)=>{
    const userId = req.params.id;

    try {
        const userOrders = await Order.find({ 'user': userId })
          .select('user._id cart.totalQty cart.totalCost paymentId Delivered address createdAt items.products');
    
        res.json(userOrders);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las órdenes del usuario' });
      }
}

const newOrder = async (req, res) => {
    try {
        let order = req.body;
        order.user = new mongoose.Types.ObjectId(req.body.user);
        order.address = new mongoose.Types.ObjectId(req.body.address);

        order.items = [];
        order.items = req.body.cart.items.map(item => ({
            product: new mongoose.Types.ObjectId(item.product),
            qty: item.qty,
            price: item.price
        })); 
        const neworder = new Order(order);
        let savedOrder = await neworder.save();

        res.json(savedOrder);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


module.exports={allOrders,newOrder,orderbyID}
