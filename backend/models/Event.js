const mongoose = require('mongoose');//importing mongoose library to create event schema
const { v4: uuidv4 } = require('uuid'); // importing the uuid library

//creating a schema for the Event model
const eventSchema = new mongoose.Schema({
    eventID: {
        type: String,
        default: uuidv4, //generating a unique id for the event
        required: true,
    },

    name: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },
    
    location: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Event', eventSchema); //exporting the event model