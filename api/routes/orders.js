const express = require('express');

const router = express.Router();

router.get('/' , (req,res,next)=>{
    res.status(200).json({
        msg:"GET/ reqiests to orers"
    });
});

router.post('/' , (req,res,next)=>{
    let order = {
        id : req.body.productId ,
        quantity : req.body.quantity
    }
    res.status(201).json({
        msg:"POSt/ reqiests to orders",
        order : order
    });
});

router.post('/orderId' , (req,res,next)=>{
    res.status(201).json({
        msg:"post to orders"
    });
});


module.exports =router;