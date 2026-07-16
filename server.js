// Express Server Setup
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static('public'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/matches', require('./routes/matches'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/users', require('./routes/users'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/notifications', require('./routes/notifications'));

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running ✅', timestamp: new Date() });
});

// Socket.io Events
io.on('connection', (socket) => {
    console.log(`🎮 User connected: ${socket.id}`);

    // User joined match
    socket.on('join-match', (data) => {
        console.log(`Player joined match: ${data.matchId}`);
        socket.join(`match-${data.matchId}`);
        io.to(`match-${data.matchId}`).emit('player-joined', {
            playerId: data.playerId,
            playerName: data.playerName,
            timestamp: new Date()
        });
    });

    // Match started
    socket.on('match-started', (data) => {
        io.to(`match-${data.matchId}`).emit('match-update', {
            status: 'started',
            roomId: data.roomId,
            password: data.password
        });
    });

    // Match ended
    socket.on('match-ended', (data) => {
        io.to(`match-${data.matchId}`).emit('match-results', {
            winners: data.winners,
            prizeAmount: data.prizeAmount,
            timestamp: new Date()
        });
    });

    // Chat message
    socket.on('chat-message', (data) => {
        io.to(`match-${data.matchId}`).emit('new-message', {
            playerName: data.playerName,
            message: data.message,
            timestamp: new Date()
        });
    });

    // Leaderboard update
    socket.on('stats-update', (data) => {
        io.emit('leaderboard-update', data);
    });

    socket.on('disconnect', () => {
        console.log(`❌ User disconnected: ${socket.id}`);
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🎮 Socket.io listening...`);
});

module.exports = { app, io };
