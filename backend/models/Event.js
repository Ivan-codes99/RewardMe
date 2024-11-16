const mongoose = require('mongoose');//importing mongoose library to create event schema
const { v4: uuidv4 } = require('uuid'); // importing the uuid library

//creating a schema for the Event model
const EventSchema = new mongoose.Schema({
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
    },

    category: {
        type: String,
        required: true,
        enum: ['Conference', 'Workshop', 'Concert', 'Meetup'], // Define categories
        default: 'Meetup'
    },

    attendees: [
        {
            userID: { type: String, required: true }, // User ID of the attendee
            status: { type: String, enum: ['Confirmed', 'Pending'], default: 'Pending' }
        }
    ]
    

})

module.exports = mongoose.model('Event', EventSchema); //exporting the event model