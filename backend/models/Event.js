const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 

//creating a schema for the Event model
const EventSchema = new mongoose.Schema({
    eventID: {
        type: String,
        default: uuidv4, 
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
        enum: ['Conference', 'Workshop', 'Concert', 'Meetup'], 
        default: 'Meetup'
    },

    attendees: [
        {
            userID: { type: String, required: true }, 
            status: { type: String, enum: ['Confirmed', 'Pending'], default: 'Pending' }
        }
    ]
    

})

module.exports = mongoose.model('Event', EventSchema); 