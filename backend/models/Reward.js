const mongoose = require('mongoose'); // Importing mongoose library
const { v4: uuidv4 } = require('uuid'); // Importing uuid library

// Creating a schema for the Reward model
const RewardSchema = new mongoose.Schema({
    rewardID: {
        type: String,
        default: uuidv4, // Generating a unique id for the reward
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pointsCost: {
        type: Number,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
    isActive: { 
        type: Boolean, 
        default: true, // Default to active when created
        required: true,
    },
    redeemedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Track users who redeemed the reward
    category: { type: String }, // Optional: Category of the reward
    tags: [{ type: String }], // Optional: Tags for filtering
});

// Middleware to automatically deactivate expired rewards
RewardSchema.pre('save', function (next) {
    if (this.expirationDate && new Date() > this.expirationDate) {
        this.isActive = false; // Deactivate reward if expired
    }
    next();
});

module.exports = mongoose.model('Reward', RewardSchema); // Exporting the reward model
