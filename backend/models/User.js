const mongoose = require('mongoose'); // Importing mongoose library
const { v4: uuidv4 } = require('uuid'); // Importing uuid library
const bcrypt = require('bcryptjs'); // Importing bcryptjs library to hash passwords

// Creating a schema for the User model
const UserSchema = new mongoose.Schema({
    userID: {
        type: String,
        default: uuidv4, //generating a unique id for the user
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
    // New fields for User Profile Management
    bio: {
        type: String, // Optional bio field for the user
    },
    contactInfo: { // Object to hold contact details like email or phone
        email: { type: String },
        phone: { type: String }
    },
    profilePicture: { // URL or file path to profile picture
        type: String,
    },
    // New field for Account Settings Management
    settings: {
        notifications: { type: Boolean, default: true }, // Enable/disable notifications
        privacy: { type: String, enum: ['public', 'private'], default: 'public' }, // Privacy level
        language: { type: String, default: 'en' } // Preferred language
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

module.exports = mongoose.model('User', UserSchema); // Exporting the User model
