const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

const connection = async () =>{
    try{  
       await mongoose.connect(process.env.MONGODBURL);
       console.log("connection successfull");
   }
   catch(error){
       console.log("error in connecting",error.message);
   }
   }

module.exports= connection;
   