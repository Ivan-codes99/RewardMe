const Reward = require('../models/Reward'); // Import the Reward model

// Create a new reward
const createReward = async (req, res) => {
    try {
        const reward = new Reward(req.body);
        await reward.save();
        res.status(201).json(reward);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create reward' });
    }
};

// Retrieve all rewards
const getRewards = async (req, res) => {
    try {
        const rewards = await Reward.find();
        res.status(200).json(rewards);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve rewards' });
    }
};

// Update a reward by ID
const updateReward = async (req, res) => {
    try {
        const reward = await Reward.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!reward) {
            return res.status(404).json({ error: 'Reward not found' });
        }
        res.status(200).json(reward);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update reward' });
    }
};

// Delete a reward by ID
const deleteReward = async (req, res) => {
    try {
        const reward = await Reward.findByIdAndDelete(req.params.id);
        if (!reward) {
            return res.status(404).json({ error: 'Reward not found' });
        }
        res.status(200).json({ message: 'Reward deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete reward' });
    }
};

module.exports = { createReward, getRewards, updateReward, deleteReward };
