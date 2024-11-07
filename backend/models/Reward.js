const mongoose = require('mongoose'); //importing mongoose library to create reward schema
const { v4: uuidv4 } = require('uuid'); // importing the uuid library

//creating a schema for the Reward model
const rewardSchema = new mongoose.Schema({
    rewardID: {
        type: String,
        default: uuidv4, //generating a unique id for the reward
        required: true,
    },

    description: {
        type: String,
        required: true
    },

    pointsCost: {
        type: Number,
        required: true
    },
    
    expirationDate: {
        type: Date,
        required: true
    },
})

module.exports = mongoose.model('Reward', rewardSchema); //exporting the reward model