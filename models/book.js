const mongoose = require('mongoose');

const bookSchema = new mongoose({
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
        type: NUmber
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
        type: Date
    },
    rating: {
        type: Number
    },
    numberOfReviews: {
        type: Number,
    }
});


module.exports = mongoose.model('Book', bookSchema, 'book');