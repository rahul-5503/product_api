const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

const connection = async () =>{
    try{  
       await mongoose.connect(process.env.MONGODBURL);
       console.log("connection successfull");
   }
   catch(error){
       console.log("error in connecting",error.message);
       process.exit(1); 
   }
   }

module.exports= connection;
   