const express = require('express');
const { createReward, getRewards, updateReward, deleteReward, getFilteredRewards, redeemReward, toggleRewardActivation } = require('../controllers/rewardController');
const router = express.Router();


// Reward CRUD routes
router.post('/rewards', createReward);        // Create a new reward
router.post('/rewards/:id/redeem', redeemReward); // Redeem Reward
router.get('/rewards', getRewards);           // Retrieve all rewards
router.get('/rewards/filter', getFilteredRewards); // Allow users to apply filters when retrieving rewards
router.put('/rewards/:id', updateReward);     // Update a specific reward by ID
router.put('/rewards/:id/toggleActivation', toggleRewardActivation); 
router.delete('/rewards/:id', deleteReward);  // Delete a reward by ID

module.exports = router;
