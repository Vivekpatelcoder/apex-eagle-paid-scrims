// Frontend API Service
const API_BASE_URL = 'http://localhost:5000/api';

class APIService {
    constructor() {
        this.token = localStorage.getItem('authToken');
    }

    // Headers with authentication
    getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        };
    }

    // Auth API
    async register(name, email, password, uid) {
        return await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ name, email, password, uid })
        }).then(res => res.json());
    }

    async login(email, password) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ email, password })
        }).then(res => res.json());

        if (response.token) {
            this.token = response.token;
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('currentUser', JSON.stringify(response.user));
        }

        return response;
    }

    // Matches API
    async getMatches() {
        return await fetch(`${API_BASE_URL}/matches`, {
            headers: this.getHeaders()
        }).then(res => res.json());
    }

    async getMatchDetails(matchId) {
        return await fetch(`${API_BASE_URL}/matches/${matchId}`, {
            headers: this.getHeaders()
        }).then(res => res.json());
    }

    async joinMatch(matchId, playerData) {
        return await fetch(`${API_BASE_URL}/matches/${matchId}/join`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(playerData)
        }).then(res => res.json());
    }

    async createMatch(matchData) {
        return await fetch(`${API_BASE_URL}/matches/create`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(matchData)
        }).then(res => res.json());
    }

    // Payments API
    async initiatePhonePePayment(amount, orderId) {
        return await fetch(`${API_BASE_URL}/payments/phonepe/initiate`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ 
                userId: currentUser?.id,
                amount, 
                orderId 
            })
        }).then(res => res.json());
    }

    async checkPaymentStatus(transactionId) {
        return await fetch(`${API_BASE_URL}/payments/phonepe/status/${transactionId}`, {
            headers: this.getHeaders()
        }).then(res => res.json());
    }

    async getTransactionHistory(userId) {
        return await fetch(`${API_BASE_URL}/payments/history/${userId}`, {
            headers: this.getHeaders()
        }).then(res => res.json());
    }

    // Users API
    async getUserProfile(userId) {
        return await fetch(`${API_BASE_URL}/users/${userId}`, {
            headers: this.getHeaders()
        }).then(res => res.json());
    }

    async getUserStats(userId) {
        return await fetch(`${API_BASE_URL}/users/${userId}/stats`, {
            headers: this.getHeaders()
        }).then(res => res.json());
    }

    async getUserMatches(userId) {
        return await fetch(`${API_BASE_URL}/users/${userId}/matches`, {
            headers: this.getHeaders()
        }).then(res => res.json());
    }

    async updateUserProfile(userId, profileData) {
        return await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(profileData)
        }).then(res => res.json());
    }

    // Leaderboard API
    async getLeaderboard(filter = 'all') {
        return await fetch(`${API_BASE_URL}/leaderboard?filter=${filter}`, {
            headers: this.getHeaders()
        }).then(res => res.json());
    }

    // Admin API
    async getAdminStats() {
        return await fetch(`${API_BASE_URL}/admin/stats`, {
            headers: this.getHeaders()
        }).then(res => res.json());
    }

    async getAllPlayers() {
        return await fetch(`${API_BASE_URL}/admin/players`, {
            headers: this.getHeaders()
        }).then(res => res.json());
    }

    async blockPlayer(playerId, blocked) {
        return await fetch(`${API_BASE_URL}/admin/players/${playerId}/block`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({ blocked })
        }).then(res => res.json());
    }
}

const apiService = new APIService();
