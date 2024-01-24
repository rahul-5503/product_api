
const express=require('express');
const router=express.Router();
const Cart=require('../schemas/cart');
const product=require('../schemas/product');
const mongoose=require('mongoose')
router.get('/',(req,res)=>{
    //res.send("Welcome to the API");
    Cart.find()
    .populate(path='productId',select='name price description')//this use to get the name price descrition of the purticular product only
    .exec()
    .then((result)=> {    
       // console.log(result);
        const output={
            cart_parduct:{
                products:result.map(doc=>{
                    return{

                        _id:doc._id,
                        productdetails:doc.productId,
                        quantity:doc.quantity,
                        dateandtime:doc.quantity,
                    request:{
                        method:"GET",
                        url:'https://localhost:3000/cart/'+doc._id
                    }}})  
                     }       
                  }
        res.status(200).json({
            count: result.length,
            message:output
        })
    })
    .catch((err)=>{
        console.log(err);
    })
})
router.post('/',(req,res)=>{
    product.findById(req.body.productId)
    .then(
        product=>{
            if(!product){
                return res.status(404).json(
                    {message: "No such Product found"
            });
        }
        const cart = new Cart({  
            _id: new mongoose.Types.ObjectId(),
            productId     : req.body.productId,
            quantity         : req.body.quantity,
        })
        return cart.save()
        .then(result =>{
            console.log("successfull");
            res.status(200).json({message:"Add in Cart",
        result:{
            Method:"GET",
            URL:"http://localhost:4000/cart/"+result._id
        }})
        })
    }
    )
    .catch(err =>{
        console.log(err);
        res.status(400).json({message:"error"})
    })
})

router.get('/:cartid',(req,res)=>{ 
   
    Cart.findById(req.params.cartid)
    .exec()
    .then(cartEntry => {
        if(!cartEntry){
            return res.status(404).json({
                message:"not found"
            })
        }
        if (cartEntry) {
            res.status(200).json({
                cartid:cartEntry._id,
                data: {
                    cartEntry: {
                        product: cartEntry.productId,//it return all the values in the product
                        quantity: cartEntry.quantity,
                        createdAt: cartEntry.dateandtime,
                    },
                    request:{
                            Method:"GET",
                            url:"https://localhost:4000/cart"
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

router.delete('/:cartItemId', (req, res) => {
   Cart.findByIdAndDelete({_id:req.params.cartItemId})
   .exec()
   .then( carts=>{
        if(!carts){
            return res.status(404).json({
                message:"not found"
            })
        }
        res.status(200).json({

            message:"deleted",
            cart:carts,
            request:{
                Method:"GET",
                url:"https://localhost:4000/cart"
            }
        })
    }
   )
   .catch(err => {
    console.error('Error fetching cart entry:', err);
    res.status(500).json({ message: "Internal Server Error" });
     });
});

module.exports=router;