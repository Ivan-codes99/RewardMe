const express = require('express');
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/eventController');
const router = express.Router();

// Event CRUD routes
router.post('/events', createEvent);        // Create a new event
router.get('/events', getEvents);           // Retrieve all events
router.put('/events/:id', updateEvent);     // Update a specific event by ID
router.delete('/events/:id', deleteEvent);  // Delete an event by ID

module.exports = router;