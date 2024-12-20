const User = require('../models/User'); //importing user model

// Update user profile information
const updateProfile = async (req, res) => {
    try {
        const { bio, contactInfo } = req.body;
        const profilePicture = req.file ? `/uploads/${req.file.filename}` : undefined;

        
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id, 
            {
                bio,
                contactInfo,
                ...(profilePicture && { profilePicture }) 
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
