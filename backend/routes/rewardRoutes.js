//TODO Create test HTTP requests
const express = require('express');
const {searchRewards, createReward, getRewards, updateReward, deleteReward, getFilteredRewards, redeemReward, toggleRewardActivation } = require('../controllers/rewardController');
const router = express.Router();

// Reward CRUD routes
router.post('/rewards', createReward);        
router.post('/rewards/:id/redeem', redeemReward); 
router.get('/rewards', getRewards);           
router.get('/rewards/filter', getFilteredRewards);
router.put('/rewards/:id', updateReward);     
router.put('/rewards/:id/toggleActivation', toggleRewardActivation); 
router.delete('/rewards/:id', deleteReward);  
router.get('/search', searchRewards); 

module.exports = router;
