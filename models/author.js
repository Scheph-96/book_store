const mongoose = require('mongoose');


const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    country: {
        type: String
    },
    birthdate: {
        type: Date
    },
    bio: {
        type: String,
    },
    photo: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Author', authorSchema, 'author');