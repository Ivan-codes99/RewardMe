const mongoose = require('mongoose'); 
const { v4: uuidv4 } = require('uuid'); 

// Creating a schema for the Reward model
const RewardSchema = new mongoose.Schema({
    rewardID: {
        type: String,
        default: uuidv4, 
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
        default: true, 
        required: true,
    },
    redeemedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
    category: { type: String },
    tags: [{ type: String }], 
});

// Middleware to automatically deactivate expired rewards
RewardSchema.pre('save', function (next) {
    if (this.expirationDate && new Date() > this.expirationDate) {
        this.isActive = false; // Deactivate reward if expired
    }
    next();
});

module.exports = mongoose.model('Reward', RewardSchema); 
