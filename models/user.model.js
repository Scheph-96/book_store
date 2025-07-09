const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        validate: {
            validator: (data) => {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(data);
            },
            message: props => `${props.value} is not a valid email`
        },
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('User', userSchema, 'user');