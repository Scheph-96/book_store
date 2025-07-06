const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
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
    stock: {
        type: Number,
        required: true
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true,
    },
    datePublished: {
        type: Date,
        required: true,
    },
    rating: {
        type: Number,
        default: 0
    },
    numberOfReviews: {
        type: Number,
        default: 0
    }
});


module.exports = mongoose.model('Book', bookSchema, 'book');