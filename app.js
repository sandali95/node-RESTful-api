const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const config = require('./api/config/database');

const app = express();

//Database connection
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected',function(){
  console.log('Connected to database : '+config.database);
});
mongoose.connection.on('error',function(err){
  console.log('Database Error : '+err);
});

//static front end files
app.use('/uploads',express.static('./uploads'));

//logger middleware function
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors);

//Routes to handle requests
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

//Error handleing
app.use((req,res,next)=>{
    let error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error : {
            msg : error.message
        }
    });
});


module.exports = app ;