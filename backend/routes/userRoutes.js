//TODO Create test HTTP requests
const express = require('express');
const { updateProfile, updateSettings } = require('../controllers/userController');
const upload = require('../middleware/upload'); 
const router = express.Router();

router.put('/profile', upload.single('profilePicture'), updateProfile);
router.put('/settings', updateSettings);

module.exports = router;
