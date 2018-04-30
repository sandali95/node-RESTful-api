const express = require('express');
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('.signup',(req,res)=>{
    
    User.findEmail(req,body.email,(err,data)=>{
        if(data){
            return res.status(402).json({
                message : "Email address is already in use"
            });
        }
    })

    bcrypt.hash(req.body.password , 10 ,(err,hash)=>{
        if(err) {
            return res.status(500).json(
                {error : err}
            )
        }else{
            let newUser = {
                _id : new  mongoose.Types.ObjectId(),
                email : req.body.email,
                password : hash
            }
            User.addUser(newUser,(err,data)=>{
                if(err){
                    res.status(500).json({
                        success : false,
                        msg : err,
                        user : newUser
                    });
                  }else{
                    res.status(201).json({
                        success : true,
                        msg : "Created a new User",
                        user : data
                    });
                  }
            });
        }
    });
});


module.exports =router;