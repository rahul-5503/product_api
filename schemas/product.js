const mongoose =require('mongoose');

const product= new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: {type : String , required : true}, //product name
    description :{ type:String },//description of the product
    category:{type:String,required:true},//category to which this product belongs(E g., Electronics/Clothing)
    price:{type:Number,required:true},//price of the product in $
    discounted_price:{type:Number},//discounted price if any
    images:[{url:String}],//array of image urls for the products
})

module.exports=mongoose.model("product",product);
