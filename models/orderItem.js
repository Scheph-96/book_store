const mongoose = require('mongoose');

const orderItemSchema = new mongoose({
    quantity: {
        type: Number,
        required
    },
    book:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',        
    }
});


module.exports = mongoose.model('OrderItem', orderItemSchema, 'orderitem');