const Event = require('../models/Event'); // Import the Event model

// Create a new event
const createEvent = async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create event' });
    }
};

// Retrieve all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve events' });
    }
};

// Update an event by ID
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update event' });
    }
};

// Delete an event by ID
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete event' });
    }
};

// Search events by query (name or location)
const searchEvents = async (req, res) => {
    try {
        const { query } = req.query; 
        const events = await Event.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, 
                { location: { $regex: query, $options: 'i' } }
            ]
        });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search events' });
    }
};

// Filter events by date range
const filterEventsByDate = async (req, res) => {
    try {
        const { startDate, endDate } = req.query; 
        const events = await Event.find({
            date: { $gte: new Date(startDate), $lte: new Date(endDate) }
        });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to filter events by date range' });
    }
};

// Get events with pagination
const getEventsWithPagination = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const events = await Event.find().skip(skip).limit(limit);
        const total = await Event.countDocuments();

        res.status(200).json({
            events,
            page,
            totalPages: Math.ceil(total / limit),
            totalEvents: total
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve events with pagination' });
    }
};

// Add RSVP for an event
const addRSVP = async (req, res) => {
    try {
        const { id } = req.params;
        const { userID, status } = req.body;

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        event.attendees.push({ userID, status });
        await event.save();

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add RSVP' });
    }
};

module.exports = { createEvent, getEvents, updateEvent, deleteEvent, searchEvents, filterEventsByDate
    , getEventsWithPagination, addRSVP };