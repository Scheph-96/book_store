const mongoose = require('mongoose');


const genreSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    }
});


module.exports = mongoose.model('Genre', genreSchema, 'genre');