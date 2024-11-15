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

// Update reward's active state
const toggleRewardActivation = async (req, res) => {
    try {
        const reward = await Reward.findById(req.params.id);
        if (!reward) return res.status(404).json({ error: 'Reward not found' });

        reward.isActive = !reward.isActive;
        await reward.save();

        res.status(200).json({ message: `Reward ${reward.isActive ? 'activated' : 'deactivated'}` });
    } catch (error) {
        res.status(500).json({ error: 'Error toggling reward activation' });
    }
};

// Redeem Reward
const redeemReward = async (req, res) => {
    const { userId } = req.body;

    try {
        const reward = await Reward.findById(req.params.id);
        if (!reward) return res.status(404).json({ error: 'Reward not found' });

        // Check if user has already redeemed the reward
        if (reward.redeemedBy.includes(userId)) {
            return res.status(400).json({ error: 'Reward already redeemed' });
        }

        reward.redeemedBy.push(userId); // Add user to redeemed list
        await reward.save();

        res.status(200).json({ message: 'Reward redeemed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error redeeming reward' });
    }
};

// Category and Tag Filtering 
const getFilteredRewards = async (req, res) => {
    const { category, tags, isActive } = req.query;

    try {
        const query = {};
        if (category) query.category = category;
        if (tags) query.tags = { $all: tags.split(',') }; // Expecting tags as comma-separated values
        if (isActive !== undefined) query.isActive = isActive === 'true';

        const rewards = await Reward.find(query);
        res.status(200).json(rewards);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching rewards with filters' });
    }
};



module.exports = { createReward, getRewards, updateReward, deleteReward, getFilteredRewards, redeemReward, toggleRewardActivation };
