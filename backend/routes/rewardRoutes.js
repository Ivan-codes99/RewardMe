const express = require('express');
const { createReward, getRewards, updateReward, deleteReward, getFilteredRewards, redeemReward, toggleRewardActivation } = require('../controllers/rewardController');
const router = express.Router();
const { searchRewards } = require('../controllers/rewardController');

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
