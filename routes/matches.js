const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Mock database
let matches = [
    {
        id: '1',
        title: 'Sunday Clash Squad (4v4)',
        type: '4v4',
        time: new Date(Date.now() + 86400000),
        entry: 50,
        prize: 5000,
        maxSlots: 40,
        participants: [],
        status: 'registration',
        map: 'Bermuda',
        createdBy: 'admin'
    }
];

// Get all matches
router.get('/', (req, res) => {
    try {
        res.json({
            total: matches.length,
            matches: matches.map(m => ({
                ...m,
                slots: `${m.participants.length}/${m.maxSlots}`
            }))
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get match details
router.get('/:matchId', (req, res) => {
    try {
        const match = matches.find(m => m.id === req.params.matchId);
        if (!match) {
            return res.status(404).json({ error: 'Match not found' });
        }

        res.json({
            ...match,
            slots: `${match.participants.length}/${match.maxSlots}`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create match (Admin only)
router.post('/create', (req, res) => {
    try {
        const { title, type, time, entry, prize, maxSlots } = req.body;

        const newMatch = {
            id: uuidv4(),
            title,
            type,
            time: new Date(time),
            entry,
            prize,
            maxSlots,
            participants: [],
            status: 'registration',
            map: 'Bermuda',
            createdBy: 'admin',
            createdAt: new Date()
        };

        matches.push(newMatch);

        res.status(201).json({
            message: 'Match created successfully',
            match: newMatch
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Join match
router.post('/:matchId/join', (req, res) => {
    try {
        const { userId, playerName, ign, uid } = req.body;
        const match = matches.find(m => m.id === req.params.matchId);

        if (!match) {
            return res.status(404).json({ error: 'Match not found' });
        }

        if (match.participants.length >= match.maxSlots) {
            return res.status(400).json({ error: 'Match slots full' });
        }

        match.participants.push({
            userId,
            playerName,
            ign,
            uid,
            joinedAt: new Date()
        });

        res.json({
            message: 'Joined match successfully',
            slots: `${match.participants.length}/${match.maxSlots}`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update match status
router.put('/:matchId/status', (req, res) => {
    try {
        const { status, roomId, password } = req.body;
        const match = matches.find(m => m.id === req.params.matchId);

        if (!match) {
            return res.status(404).json({ error: 'Match not found' });
        }

        match.status = status;
        if (roomId) match.roomId = roomId;
        if (password) match.password = password;

        res.json({
            message: 'Match status updated',
            match: match
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
