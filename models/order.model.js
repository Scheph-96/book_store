const mongoose = require("mongoose");

const orderStateValues = ["pending", "cancelled", "shipped"];

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  books: [
    {
      quantity: { type: Number, required: true },
      itemTotalPrice: { type: Number, required: true },
      book:
      {
        _id: mongoose.Schema.Types.ObjectId,
        cover: {
          type: String,
          required: true
        },
        title: {
          type: String,
          required: true
        },
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Author',
          required: true,
        },
        numberOfPages: {
          type: Number
        },
        summary: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        genre: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Genre',
          required: true,
        },
      }
    }
  ],
  amount: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    enum: {
      values: orderStateValues,
      message: 'num validator failed for path `{PATH}` with value `{VALUE}`',
    },
    default: 'pending',
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('Order', orderSchema, 'order');
