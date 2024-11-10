const express = require('express');
const { createReward, getRewards, updateReward, deleteReward } = require('../controllers/rewardController');
const router = express.Router();

// Reward CRUD routes
router.post('/rewards', createReward);        // Create a new reward
router.get('/rewards', getRewards);           // Retrieve all rewards
router.put('/rewards/:id', updateReward);     // Update a specific reward by ID
router.delete('/rewards/:id', deleteReward);  // Delete a reward by ID

module.exports = router;
