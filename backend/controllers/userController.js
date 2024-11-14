const User = require('../models/User');

// Update user profile information
const updateProfile = async (req, res) => {
    try {
        const { bio, contactInfo } = req.body;
        const profilePicture = req.file ? `/uploads/${req.file.filename}` : undefined;

        // Find user by ID and update profile information
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id, // Assuming req.user.id is set after authentication
            {
                bio,
                contactInfo,
                ...(profilePicture && { profilePicture }) // Only update if a file was uploaded
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
};


// Update user account settings
const updateSettings = async (req, res) => {
    try {
        const { notifications, privacy, language } = req.body.settings;

        // Find user by ID and update settings information
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {
                'settings.notifications': notifications,
                'settings.privacy': privacy,
                'settings.language': language
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Settings updated successfully', settings: updatedUser.settings });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update settings' });
    }
};

module.exports = { updateProfile, updateSettings };
