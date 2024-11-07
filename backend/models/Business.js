const mongoose = require('mongoose'); // importing mongoose library to create business schema
const { v4: uuidv4 } = require('uuid'); // importing the uuid library

// creating a schema for the Business model
const BusinessSchema = new mongoose.Schema({
    businessID: {
        type: String,
        default: uuidv4, // generating a unique id for the business
        required: true,
    },

    name: {
        type: String,
        required: true
    },

    contactInfo: {
        type: String, // contact info can be a phone number or email
        required: true
    }
    
});

module.exports = mongoose.model('Business', BusinessSchema); // exporting the Business model
