const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email : {type:String , required:true},
    password : {type:String , required:true}
});

const User = module.exports = mongoose.model('User',userrSchema);

module.exports.addUser = function(newUser , callback){
    newUser.save(callback);
}

module.exports.findEmail = function (email,callback){
    User.find({email:email},callback);
}