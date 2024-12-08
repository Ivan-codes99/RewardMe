const mongoose = require('mongoose'); 
const { v4: uuidv4 } = require('uuid'); 

// creating a schema for the Promotion model
const PromotionSchema = new mongoose.Schema({

    promoID: {
        type: String,
        default: uuidv4, 
        required: true,
    },
    
    businessID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business', 
        required: true
    },
    
    description: 
    {
        type: String,
        required: true,
    },

    validity: 
    {
        type: Date,
        required: true,
    }

});

module.exports = mongoose.model('Promotion', PromotionSchema); 