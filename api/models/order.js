const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    product : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'Product'
    },
    quantity : { type : Number ,default : 1 , required : true}
});

const Order = module.exports = mongoose.model('Order',orderSchema);

module.exports.addOrder = function(newOrder,callback){
    newOrder.save(callback);
}

module.exports.getAllOrders = function(callback){
    Order.find(callback);
}

module.exports.getOrdersByProductId = function(productId , callback){
    //need to write this
}

module.exports.getOrderById =  function(orderId , callback){
    Order.findById(orderId , callback);
}