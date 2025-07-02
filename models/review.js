const mongoose = require('mongoose');

const reviewSchema = mongoose.model({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    rate: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});


module.export = mongoose.model('Review', reviewSchema, 'review');