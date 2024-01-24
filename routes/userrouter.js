
const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User =require('../schemas/user');
const bcrypt =require('bcrypt');

router.get('/',(req,res)=>{
    User.find()
    .exec()
    .then(
        (result) =>{
            const output={
                user:result.map(doc=>{
                    return{
                        id : doc._id,
                        username: doc.email,
                     //   password: doc.password,
                    } })}
            res.status(200).json({
                count: result.length,
                message:output
            })
        })
    .catch(error=>{
        console.log(error);
        res.status(400).json({message:'Error in Saving data'})
    })
})

router.post('/signup',(req,res)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user => {
        if(user.length>=1){
            return res.status(409).json({message:'Email already in use'});
        }
        else{
            bcrypt.hash(req.body.password,10,(err ,hash)=>{
                if(err) {
                    return res.status(500).json({
                        error: err
                    })
               }
               else{
                    const user =new User({
                        _id: new mongoose.Types.ObjectId(),
                        email:req.body.email,
                        password:hash
                    })
                    user.save()
                    .then(result =>{
                        console.log(result);
                         res.status(201).json({message:"user created ok"})
                    }).catch(err =>{
                        console.log(err);
                        res.status(400).json({message:"error"})
                   })
               }
             })      
        }
    })
})

router.post('/login',(req,res)=>{
    User.find({email:req.body.email})
    .exec()
    .then( user=>{
        if(user.length < 1){
            return res.status(401).json({
                message : "Auth failed"
            })
        }
        bcrypt.compare(req.body.password,user[0].password, (err,result)=>{
        
            if(result){
                return res.status(200).json({message:'ok'})
            }
         else {
                console.log(err)
                return res.status(401).json({message:'wrong password'});
        }
        
    })
         
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json({
            message:"user can't find"
        })
    })
})
router.delete('/delete/:userid',(req,res)=>{
    User.findByIdAndDelete({_id:req.params.userid})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({message:"Deleted succesfully"})
    })
    .catch(error=>{
        console.log(error);
        res.status(404).json({
            message : 'User not found'
        })
    })
})

module.exports=router;