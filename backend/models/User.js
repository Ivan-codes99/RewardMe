const mongoose = require('mongoose'); //importing mongoose library to create mongoose schema
const bcrypt = require('bcryptjs'); //importing bcryptjs library to hash passwords

//creating a schema for the User model
const userSchema = new mongoose.Schema({

    userID :{
        type: String,
        default: uuidv4,
        required: true,
        },
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
        enum: ['student', 'faculty', 'admin'],
        required: true,
    },
    rewardBalance: {
        type: Number,
        default: 0,
    },
    });

module.exports = mongoose.model('User', userSchema); //exporting the User model