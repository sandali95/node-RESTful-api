const express = require('express');

const morgan = require('morgan');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');


const app = express();

//logger middleware function
app.use(morgan('dev'));

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