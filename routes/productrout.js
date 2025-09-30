const express = require('express');
const mongoose =require('mongoose');
const router  = express.Router();
const Product=require('../schemas/product');
router.post('/',(req,res)=>{
    console.log(req.body);
    const productre = new Product ({
        _id            : new mongoose.Types.ObjectId(),
        name          : req.body.name,
        description   : req.body.description,
        price         : req.body.price,
        discount_price: req.body.discount_price,
        category      : req.body.category,
        images:  req.body.images || [], 
        stock        : req.body.stock
    })
    productre.save()
    .then(result =>{
            console.log("successfull");
           res.status(200).json({message:"ok"})
    }).catch(err =>{
        console.log(err);
        res.status(500).json({message:"internal server error"})
    })
});

router.get('/',(req,res)=>{
      Product.find()
      .select(' _id name description price discount_price category images stock')
      .exec()
      .then(result =>{
        const output={
            count:result.length,
            products:result.map(doc=>{
                return{
                    id: doc.id,
                    name: doc.name,
                    description:doc.description,
                    category:doc.category,
                    price:doc.price,
                    discount_price:doc.discounted_price,
                    images:doc.images || [],
                    stock:doc.stock
                }})     
        }
        res.status(200).json({
            output
        })
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({message:"error"})
      })
});

router.get('/productid/:id', (req, res) => {
    const productId = req.params.id;

    Product
        .findOne({ _id: productId })
        .select('_id name description price discounted_price category images stock')
        .exec()
        .then(product => {
            if (product) {
                res.status(200).json({
                    data: {
                        product: {
                            id: product._id,
                            name: product.name,
                            description: product.description,
                            category: product.category,
                            price: product.price,
                            discounted_price: product.discounted_price,
                            images: product.images || [],
                            stock:product.stock
                        }
                    }
                });
            } else {
                res.status(404).json({ message: "No valid entry found for the provided ID." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        });
});

router.get('/category/:name', (req, res) => {
    const category = req.params.name;
   
    Product
        .find({ category: category })
        .select('_id name description price discounted_price category images stock')
        .exec()
        .then(product => {
            if (product.length >0) {
                res.status(200).json({
                    data: {
                        products: product.map(product => ({
                            id: product._id,
                            name: product.name,
                            description: product.description,
                            category: product.category,
                            price: product.price,
                            discounted_price: product.discounted_price,
                            images:product.images || [],
                            stock:product.stock
                        }))
                    }
                });
            } else {
                res.status(404).json({ message: "No valid entry found for the provided ID." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        });
});

router.get('/name/:name', (req, res) => {
    const productName = req.params.name;

    // Create a case-insensitive regex pattern for partial matching
    const regexPattern = new RegExp(productName, 'i');

    Product
        .find({ name: { $regex: regexPattern } })
        .select('_id name description price discounted_price category images stock')
        .exec()
        .then(products => {
            if (products.length > 0) {
                res.status(200).json({
                    data: {
                        products: products.map(product => ({
                            id: product._id,
                            name: product.name,
                            description: product.description,
                            category: product.category,
                            price: product.price,
                            discounted_price: product.discounted_price,
                            images:product.images || [],
                            stock:product.stock
                        }))
                    }
                });
            } else {
                res.status(404).json({ message: "No valid entries found for the provided name." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        });
});

router.get('/name/:name/:value', (req, res) => {
    const productName = req.params.name;

    // Create a case-insensitive regex pattern for partial matching
    const regexPattern = new RegExp(productName, 'i');
    const value =req.params.value;
    Product
        .find({ name: { $regex: regexPattern },
        price:{$lt:value} })
        .select('_id name description price discounted_price category images stock')
        .exec()
        .then(products => {
            if (products.length > 0) {
                res.status(200).json({
                    data: {
                        products: products.map(product => ({
                            id: product._id,
                            name: product.name,
                            description: product.description,
                            category: product.category,
                            price: product.price,
                            discounted_price: product.discounted_price,
                            images: product.images || [],
                            stock:product.stock
                        }))
                    }
                });
            } else {
                res.status(404).json({ message: "No valid entries found for the provided name." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        });
});

router.patch('/update/:id/:description/:price/:discounted_price/:images/:stock', (req, res) => {
    const productId = req.params.id;
    const updatedproduct ={
    description: req.params.description,
     price :req.params.price,
    discounted_price : req.params.discounted_price,
    images: req.params.images,
    stock: req.params.images
    }
    console.log(updatedproduct);
    Product
        .findByIdAndUpdate(productId,
        updatedproduct,{new:true} )
        .select('_id name description price discounted_price category images stock')
        .exec()
        .then(product => {
            if (product) {
                res.status(200).json({
                    data: {
                        product: {
                            id: product._id,
                            name: product.name,
                            description: product.description,
                            category: product.category,
                            price: product.price,
                            discounted_price: product.discounted_price,
                            images: product.images || [],
                            stock:product.stock
                        },
                        message:"updated successfully"
                    }
                });
            } else {
                res.status(404).json({ message: "No valid entry found for the provided ID." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        });
});

router.delete('/delete/:productid',(req,res)=>{
    const productID=req.params.productid;
    Product.findByIdAndDelete(productID)
    .select('id name description price discounted_price category images stock')
    .exec()
    .then(deletedProduct => {
        if (deletedProduct) {
            res.status(200).json({
                message:"deleted successfully"
            })
            console.log(deletedProduct);
            console.log("Product deleted successfully.");
        } else {
            console.log("No valid entry found for the provided ID.");
        }
    })
    .catch(err => {
        console.log(err);
        console.log("Internal Server Error");
    });
});

module.exports = router;