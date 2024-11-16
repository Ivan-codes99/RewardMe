const express = require('express');
const { 
    createEvent, 
    getEvents, 
    updateEvent, 
    deleteEvent, 
    searchEvents, 
    filterEventsByDate, 
    getEventsWithPagination, 
    addRSVP 
} = require('../controllers/eventController');
const router = express.Router();

// Event CRUD routes
router.post('/events', createEvent);        // Create a new event
router.get('/events', getEvents);           // Retrieve all events
router.put('/events/:id', updateEvent);     // Update a specific event by ID
router.delete('/events/:id', deleteEvent);  // Delete an event by ID
router.get('/events/search', searchEvents); // Search for events by query
router.get('/events/filter', filterEventsByDate); // Filter events by date range
router.get('/events/paginate', getEventsWithPagination); // Retrieve events with pagination
router.post('/events/:id/rsvp', addRSVP); // Add RSVP for an event

module.exports = router;