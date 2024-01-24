const express = require('express');
const router = express.Router();
const Cart = require('../schemas/cart');
const Product = require('../schemas/product');
const mongoose = require('mongoose');
const Order = require('../schemas/order');
const user=require('../schemas/user');

router.post('/', (req, res) => {
  // Use Promise.all to handle both promises concurrently
  Promise.all([
    Product.findById(req.body.productId),
    Cart.findById(req.body.cartId),
    user.findById(req.body.userId)
  ])
    .then(([product, cart, user]) => {
      if (!product || !cart || !user) {
        return res.status(404).json({ message: "No such Product or Cart or user found" });
      }

      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        cartId: req.body.cartId,
        userId:req.body.userId,

      });

      return order.save();
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({ message: "Order created successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

router.get('/:orderid',(req,res)=>{
 Order.findById(req.params.orderid)
 .populate({path:'cartId',select:'quantity'})
 .populate({path:'userId',select:'email'})
 .populate({path:'productId',select:' name price category'})
    .exec()
    .then(orderEntry => {
        if(!orderEntry){
            return res.status(404).json({
                message:"not found"
            })
        }
        if (orderEntry) {
            res.status(200).json({
                cartid:orderEntry._id,
                userid:orderEntry.userId,
                data: {
                    order_Details :{
                        product: {
                          productId:orderEntry.productId,
                          Method:"GET",
                          Url:"https://product-api-3trd.onrender.com/product/productid/"+orderEntry.productId._id
                        },//it return all the values in the product
                        cart:{cartId: orderEntry.cartId },
                        createdAt: orderEntry.dateandtime,
                    },
                    request:{
                            Method:"GET",
                            url:"https://product-api-3trd.onrender.comorder/order"
                    }
                }
            });
        } else {
            res.status(404).json({ message: "No valid entry found for the provided product ID in the cart." });
        }
    })
    .catch(err => {
        console.error('Error fetching cart entry:', err);
        res.status(500).json({ message: "Internal Server Error" });
    });
})

router.delete('/delete/:id',(req,res)=>{
 Order.findByIdAndDelete(req.params.id)
 .exec()
 .then((deletedorder)=>{
   if(deletedorder){
    res.status(200).json({message:'Deleted Successfully'});
   }else{
    res.status(404).json({message:"Not Found"})
   }
 }).catch((error)=>{
    res.status(500).json({message:'Internal server error'})
 })
 
})

module.exports = router;
