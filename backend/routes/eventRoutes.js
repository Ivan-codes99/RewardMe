//TODO Create test HTTP requests
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
router.post('/events', createEvent);        
router.get('/events', getEvents);           
router.put('/events/:id', updateEvent);     
router.delete('/events/:id', deleteEvent);  
router.get('/events/search', searchEvents); 
router.get('/events/filter', filterEventsByDate); 
router.get('/events/paginate', getEventsWithPagination); 
router.post('/events/:id/rsvp', addRSVP); 

module.exports = router;