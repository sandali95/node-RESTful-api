const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name : String,
    price : Number
});

const Product = module.exports = mongoose.model('Product',productSchema);

module.exports.addProduct = function(newProduct,callback){
    newProduct.save(callback); 
}

module.exports.findProduct = function(id,callback){
    Product.findById(id,callback);
}

module.exports.getAllProducts = function(callback){
    Product.find(callback);
}

module.exports.deleteProducts = function(id ,callback){
    Product.remove({_id : id} , callback);
}

module.exports.updateProduct = function(id,updateops,callback){
    Product.update({_id:id , $set : updateops} , callback);
}