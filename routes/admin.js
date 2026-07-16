const express = require('express');
const router = express.Router();

// Get admin dashboard stats
router.get('/stats', (req, res) => {
    try {
        const stats = {
            totalPlayers: 1250,
            activeMatches: 8,
            totalRevenue: 150000,
            totalPrizeDistributed: 95000,
            monthlyGrowth: 15.5,
            newPlayersThisMonth: 180
        };

        res.json({ stats });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all players
router.get('/players', (req, res) => {
    try {
        const players = [
            { id: '1', name: 'Player1', email: 'player1@gmail.com', status: 'active', balance: 500 },
            { id: '2', name: 'Player2', email: 'player2@gmail.com', status: 'active', balance: 1000 }
        ];

        res.json({ total: players.length, players });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Block/Unblock player
router.put('/players/:playerId/block', (req, res) => {
    try {
        const { blocked } = req.body;

        res.json({
            message: `Player ${blocked ? 'blocked' : 'unblocked'} successfully`,
            playerId: req.params.playerId,
            blocked: blocked
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all transactions
router.get('/transactions', (req, res) => {
    try {
        const transactions = [
            { id: '1', userId: 'user1', type: 'credit', amount: 500, status: 'success', date: new Date() },
            { id: '2', userId: 'user2', type: 'debit', amount: 100, status: 'pending', date: new Date() }
        ];

        res.json({ total: transactions.length, transactions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
