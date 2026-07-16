// Socket.io Real-time Connection
const SOCKET_URL = 'http://localhost:5000';

class SocketManager {
    constructor() {
        this.socket = null;
    }

    connect() {
        if (typeof io === 'undefined') {
            console.error('Socket.io library not loaded');
            return;
        }

        this.socket = io(SOCKET_URL);

        this.socket.on('connect', () => {
            console.log('✅ Connected to server');
        });

        this.socket.on('player-joined', (data) => {
            console.log('👤 Player joined:', data.playerName);
            showNotification(`${data.playerName} joined the match!`, 'success');
        });

        this.socket.on('match-update', (data) => {
            console.log('🎮 Match update:', data);
            handleMatchUpdate(data);
        });

        this.socket.on('match-results', (data) => {
            console.log('🏆 Match results:', data);
            handleMatchResults(data);
        });

        this.socket.on('leaderboard-update', (data) => {
            console.log('📊 Leaderboard updated');
            loadLeaderboard();
        });

        this.socket.on('new-message', (data) => {
            console.log('💬 New message:', data.message);
        });

        this.socket.on('disconnect', () => {
            console.log('❌ Disconnected from server');
        });
    }

    joinMatch(matchId, playerId, playerName) {
        if (this.socket) {
            this.socket.emit('join-match', { matchId, playerId, playerName });
        }
    }

    startMatch(matchId, roomId, password) {
        if (this.socket) {
            this.socket.emit('match-started', { matchId, roomId, password });
        }
    }

    endMatch(matchId, winners, prizeAmount) {
        if (this.socket) {
            this.socket.emit('match-ended', { matchId, winners, prizeAmount });
        }
    }

    sendChatMessage(matchId, playerName, message) {
        if (this.socket) {
            this.socket.emit('chat-message', { matchId, playerName, message });
        }
    }

    updateStats(statsData) {
        if (this.socket) {
            this.socket.emit('stats-update', statsData);
        }
    }
}

const socketManager = new SocketManager();
