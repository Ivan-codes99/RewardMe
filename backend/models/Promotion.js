const mongoose = require('mongoose'); // importing mongoose library to create promotion schema
const PromotionSchema = new mongoose.Schema({

    promoID: {
        type: String,
        default: uuidv4,
        required: true,
    },
    
    businessID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business', // reference to the business model
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

module.exports = mongoose.model('Promotion', PromotionSchema); // exporting the Promotion model