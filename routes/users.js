const express = require('express');
const router = express.Router();

// Mock users database
let users = [];

// Update user profile
router.put('/:userId', (req, res) => {
    try {
        const { name, ign, phone, city } = req.body;

        // Update user in database
        const user = users.find(u => u.id === req.params.userId);
        if (user) {
            user.name = name || user.name;
            user.ign = ign || user.ign;
            user.phone = phone || user.phone;
            user.city = city || user.city;
        }

        res.json({
            message: 'Profile updated successfully',
            user: user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user stats
router.get('/:userId/stats', (req, res) => {
    try {
        const stats = {
            matches: 5,
            wins: 2,
            earnings: 5000,
            rating: 1250,
            winRate: 40,
            lastMatch: new Date(Date.now() - 86400000)
        };

        res.json({ stats });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get match history
router.get('/:userId/matches', (req, res) => {
    try {
        const matches = [
            {
                id: '1',
                title: 'Sunday Clash',
                type: '4v4',
                result: 'win',
                prize: 2000,
                date: new Date(Date.now() - 86400000)
            },
            {
                id: '2',
                title: 'Elite Solo',
                type: 'Solo',
                result: 'loss',
                prize: 0,
                date: new Date(Date.now() - 172800000)
            }
        ];

        res.json({ matches });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
