const express=require('express');
const mongoose = require('mongoose');
const connect =require('./connection');
const productrout =require('./routes/productrout');
const userrouter = require('./routes/userrouter');
const orderrouter=require('./routes/orderrout');
const cartrout =require('./routes/cartrout');
var bodyparser = require('body-parser')
const cors = require('cors'); // ✅ import cors

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

//connecting mongoose
connect();
const port =process.env.PORT || 4000
app.listen(port,()=>{
    console.log("server running in "+port);
})

app.use('/product', productrout);
app.use('/cart',cartrout);
app.use('/user',userrouter)
app.use('/order',orderrouter);
