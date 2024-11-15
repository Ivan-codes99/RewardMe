const express = require('express');
const { updateProfile, updateSettings } = require('../controllers/userController');
const router = express.Router();
const upload = require('../middleware/upload'); // Assuming you moved multer configuration to `upload.js`
const multer = require('multer');

// Configure storage and file naming
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder where images will be stored
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    }
});

// Configure multer for single file upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true); // Accept the file
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// PUT /api/users/profile to update user profile
router.put('/profile', upload.single('profilePicture'), updateProfile);

// PUT /api/users/settings to update user settings
router.put('/settings', updateSettings);

module.exports = router;