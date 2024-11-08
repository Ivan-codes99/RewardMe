const mongoose = require('mongoose'); //importing mongoose library to create user schema
const { v4: uuidv4 } = require('uuid'); // importing the uuid library

const bcrypt = require('bcryptjs'); //importing bcryptjs library to hash passwords

//creating a schema for the User model
const UserSchema = new mongoose.Schema({

    userID :{
        type: String,
        default: uuidv4, //generating a unique id for the user
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

    //to do- add a method to hash the password before saving the user'
    UserSchema.pre('save', async function(next)
    {
        //only hash if password is new or modified
        if (!this.isModified('password')) return next();

        //generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    });


    

module.exports = mongoose.model('User', UserSchema); //exporting the User model