const express = require('express');
const Product = require('../models/product');

const router = express.Router();

router.get('/' , (req,res,next)=>{
    Product.getAllProducts((err,data)=>{
        if (err) throw err;
        res.json(data);
    });
    
});

router.post('/' , (req,res,next)=>{
    let newProduct = {
        name : req.body.name,
        price : req.body.price
    }

    Product.addProduct(newProduct,(err,data)=>{
        if(err){
            res.status(201).json({
                success : false,
                msg : err,
                product : newProduct
            });
          }else{
            res.status(201).json({
                success : true,
                msg : "created a product",
                product : data
            });
          }
    });
});

router.get('/:productId' , (req,res,next)=>{
    let id = req.params.productId;

    Product.findProduct(id,(err,data)=>{
        if(err) throw err ;
        res.json(data);
    });
});

router.patch('/:productId' , (req,res,next)=>{
    let id = req.params.productId

    let updateops ={};
    for(let ops of req.body){
        updateops[ops.propName] = ops.value;
    };

    Product.updateProduct(id,updateops,(err ,data)=>{
        if(err) throw err ;
        res.json({
            success : true ,
            msg: "Successfully updated Product",
            data : data
        });
    });    
});

router.delete('/:productId' , (req,res,next)=>{
    let id = req.params.productId ;
    
    Product.deleteProduct(id,(err,data)=>{
        if(err) throw err ;
        res.json({
            success : true ,
            msg: "Successfully Removed Product"
        });
    });
    
});









module.exports = router;