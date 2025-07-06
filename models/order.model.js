const mongoose = require("mongoose");

const orderState = {
  values: ["pending", "cancelled", "shipped"],
  message: `num validator failed for path ${PATH} with value ${VALUE}`,
};
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrderItem",
    required: true,
  }],
  amount: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    enum: orderState,
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('Order', orderSchema, 'order');
