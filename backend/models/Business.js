const mongoose = require('mongoose'); // importing mongoose library to create business schema
const bcrypt = require('bcryptjs'); // importing bcryptjs library to hash passwords

// creating a schema for the Business model
const businessSchema = new mongoose.Schema({
    businessID: {
        type: String,
        default: UUIDv4,
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

module.exports = mongoose.model('Business', businessSchema); // exporting the Business model
