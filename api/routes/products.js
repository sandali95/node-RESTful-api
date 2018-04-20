const express = require('express');

const router = express.Router();

router.get('/' , (req,res,next)=>{
    res.status(200).json({
        msg:"GET/ reqiests to act-items"
    });
});

router.post('/' , (req,res,next)=>{
    res.status(201).json({
        msg:"POSt/ reqiests to act-items"
    });
});

router.get('/:productId' , (req,res,next)=>{
    let id = req.params.itemId;

    if(id === 'special'){
        res.status(200).json({
            msg:"special id"
        });
    }else{
        res.status(200).json({
            msg:"not-special"
        });
    }
    
});

router.patch('/:productId' , (req,res,next)=>{
    res.status(200).json({
        msg:"/UPDATE"
    });
    
});

router.delete('/:productId' , (req,res,next)=>{
    res.status(200).json({
        msg:"/DELETE"
    });
    
});









module.exports = router;