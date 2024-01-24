const mongoose=require('mongoose');

const order=mongoose.Schema({
        _id:new mongoose.Schema.Types.ObjectId,
        userId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
        productId:{type:mongoose.Schema.Types.ObjectId,ref:'product',required:true},
        cartId:{type:mongoose.Schema.Types.ObjectId,ref:'cart',required:true},
        dateandtime: {type:Date,default:Date.now},
});

module.exports=mongoose.model('order',order);