const express = require('express');
const Order = require('../models/order');

const router = express.Router();

router.get('/' , (req,res)=>{
    Order.getAllOrders( (err ,result)=>{
        if(err) throw err ;
        res.json({result});
    });
});

router.post('/' , (req,res)=>{
    let neworder = {
        product : req.body.productId ,
        quantity : req.body.quantity
    } ;
    Order.addOrder(neworder , (err , result)=>{
        if(err){
            res.status(201).json({
                success : false,
                msg : err,
                product : neworder
            });
        }else{
            res.status(201).json({
                success : true,
                msg : "created a order",
                product : result
            });
        }
    });
    
});

router.post('/:orderId' , (req,res,next)=>{
    let id = req.params.orderId ;
    Order.getOrderById(id , (err,result)=>{
        if(err) throw err ;
        res.json(result);
    });
});

router.post('/:productId' , (req,res,next)=>{
    res.status(201).json({
        msg:"post to orders"
    });
});


module.exports =router;