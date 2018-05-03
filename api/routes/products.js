const express = require('express');
const Product = require('../models/product');
const multer = require('multer');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

//store images
const storage = multer.diskStorage({
    destination : function(req,file,cb){
      cb(null , './uploads/');
    } ,
  
    filename : function(req,file,cb){
      cb(null ,Date.now()+file.originalname);
    }
  
  });
  
  //reject other files
  const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
      cb(null,true);
    }else{
      cb(new Error('Not relevant file type'),false);
    }
  }
  
const upload = multer({storage:storage , fileFilter:fileFilter}) ;


//Product Routes
router.get('/' , (req,res,next)=>{
    Product.getAllProducts((err,data)=>{
        if (err) throw err;
        res.status(200).json(data);
    });
    
});

router.post('/' ,checkAuth,upload.single('productImage'), (req,res,next)=>{
    let newProduct = {
        name : req.body.name,
        price : req.body.price,
        itemImage : req.file.path
    }

    Product.addProduct(newProduct,(err,data)=>{
        if(err){
            res.status(500).json({
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
        res.status(200).json(data);
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
        res.status(201).json({
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
        res.status(200).json({
            success : true ,
            msg: "Successfully Removed Product"
        });
    });
    
});









module.exports = router;