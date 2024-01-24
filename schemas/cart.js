const mongoose=require('mongoose');

const cart = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    productId:{type:mongoose.Schema.Types.ObjectId,ref:'product',required:true},
    quantity :{type:Number,default:1},
    dateandtime: {type:Date,default:Date.now},
    //userid:{type:mongoose.Schema.Types.ObjectId,ref:'user',require:true}
})

module.exports=mongoose.model("cart",cart)