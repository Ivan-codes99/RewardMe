const mongoose = require('mongoose'); 
const { v4: uuidv4 } = require('uuid'); 

// creating a schema for the Business model
const BusinessSchema = new mongoose.Schema({
    businessID: {
        type: String,
        default: uuidv4, 
        required: true,
    },

    name: {
        type: String,
        required: true
    },

    contactInfo: {
        type: String, 
        required: true
    }
    
});

module.exports = mongoose.model('Business', BusinessSchema); // exporting the Business model
