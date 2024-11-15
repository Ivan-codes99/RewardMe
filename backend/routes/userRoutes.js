const express = require('express');
const { updateProfile, updateSettings } = require('../controllers/userController');
const upload = require('../middleware/upload'); 
const router = express.Router();

// PUT /api/users/profile to update user profile
router.put('/profile', upload.single('profilePicture'), updateProfile);

// PUT /api/users/settings to update user settings
router.put('/settings', updateSettings);

module.exports = router;
