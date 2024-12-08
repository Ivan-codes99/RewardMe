const mongoose = require('mongoose'); 
const { v4: uuidv4 } = require('uuid'); 
const bcrypt = require('bcryptjs'); 

// Creating a schema for the User model
const UserSchema = new mongoose.Schema({
    userID: {
        type: String,
        default: uuidv4, 
        required: true
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
        required: true
    },
    rewardBalance: {
        type: Number,
        default: 0,
    },
    
    bio: {
        type: String,
    },
    contactInfo: { 
        email: { type: String },
        phone: { type: String }
    },
    profilePicture: { 
        type: String,
    },
   
    settings: {
        notifications: { type: Boolean, default: true }, 
        privacy: { type: String, enum: ['public', 'private'], default: 'public' }, 
        language: { type: String, default: 'en' } 
    }
});

 //method to hash the password before saving the user'
    UserSchema.pre('save', async function(next)
    {
        //only hash if password is new or modified
        if (!this.isModified('password')) return next();

        //generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    });

module.exports = mongoose.model('User', UserSchema); 
