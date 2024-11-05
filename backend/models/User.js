const mongoose = require('mongoose'); //importing mongoose library to connect to mongoDB
const bcrypt = require('bcryptjs'); //importing bcryptjs library to hash passwords

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
        },
    email: {
        type: String,
        required: true,
        unique: true
        },
    password: {
        type: String,
        required: true
        },
    role: {
        type: String,
        required: true,
    },
    rewardBalance: {
        type: Number,
        default: 0,
    },
    });

module.exports = mongoose.model('User', userSchema); //exporting the User model