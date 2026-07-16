const express = require('express');
const router = express.Router();

// Get global leaderboard
router.get('/', (req, res) => {
    try {
        const { filter = 'all', page = 1, limit = 20 } = req.query;

        const leaderboard = [
            { rank: 1, name: 'ProGamer_X', wins: 45, earnings: 25000, rating: 2450 },
            { rank: 2, name: 'SniperKing', wins: 42, earnings: 23500, rating: 2380 },
            { rank: 3, name: 'ThunderStrike', wins: 38, earnings: 20000, rating: 2290 },
            { rank: 4, name: 'PhantomHunter', wins: 35, earnings: 18500, rating: 2150 },
            { rank: 5, name: 'ShadowAssassin', wins: 32, earnings: 16000, rating: 2050 }
        ];

        res.json({
            filter: filter,
            page: page,
            limit: limit,
            total: leaderboard.length,
            leaderboard: leaderboard
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get tournament specific leaderboard
router.get('/tournament/:tournamentId', (req, res) => {
    try {
        const leaderboard = [
            { position: 1, playerName: 'ProGamer_X', kills: 25, placement: 'Winner', prize: 5000 },
            { position: 2, playerName: 'SniperKing', kills: 22, placement: 'Runner-up', prize: 3000 },
            { position: 3, playerName: 'ThunderStrike', kills: 20, placement: 'Third', prize: 2000 }
        ];

        res.json({ leaderboard });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
