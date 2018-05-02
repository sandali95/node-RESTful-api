const express = require('express');
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/signup',(req,res)=>{
    
    User.findEmail(req,body.email,(err,data)=>{
        if(data.length >=1){
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

router.post('./login',(req,res)=>{
    User.findEmail(req.body.email,(err,user)=>{
        if(user.length<1){
            return res.status(402).json({
                message : "No user exits for the Email"
            });
        }else{
            bcrypt.compare(req.body.password , user[0].password,(err,result)=>{
                if(err) throw err ;

                jwt.sign({
                    email : user[0].email,
                    userId : user[0]._id
                },
                'secret',
                {
                    expiresIn : '1h'
                }
                );
                if(result){
                    return res.status(200).json({
                        message:'Authentication Successful',
                        token : token
                    });
                }else{
                    return res.status(401).json({
                        message:'authentication unsuccessful'
                    });
                }
            });
        }
    });


});


module.exports =router;