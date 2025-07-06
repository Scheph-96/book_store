const mongoose = require('mongoose');


const genreSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Genre', genreSchema, 'genre');