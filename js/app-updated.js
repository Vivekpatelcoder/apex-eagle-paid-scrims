// Updated App.js with API Integration

let currentUser = null;
let currentPage = 'login';

// Initialize App
window.addEventListener('load', () => {
    initializeApp();
});

function initializeApp() {
    const storedUser = localStorage.getItem('currentUser');
    const storedToken = localStorage.getItem('authToken');
    
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        
        if (storedUser && storedToken) {
            currentUser = JSON.parse(storedUser);
            apiService.token = storedToken;
            socketManager.connect();
            showPage('dashboard');
            loadDashboard();
        } else {
            showPage('login');
        }
    }, 1500);
}

// Login with API
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
        const response = await apiService.login(email, password);
        
        if (response.token) {
            currentUser = response.user;
            currentUser.balance = response.balance;
            showPage('dashboard');
            loadDashboard();
        } else {
            showNotification('Login failed!', 'error');
        }
    } catch (error) {
        showNotification('Error: ' + error.message, 'error');
    }
});

// Signup with API
document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const uid = document.getElementById('signup-uid').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    
    if (password !== confirm) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    try {
        const response = await apiService.register(name, email, password, uid);
        
        if (response.token) {
            currentUser = response.user;
            apiService.token = response.token;
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showPage('dashboard');
            loadDashboard();
        } else {
            showNotification('Registration failed!', 'error');
        }
    } catch (error) {
        showNotification('Error: ' + error.message, 'error');
    }
});

// Load Dashboard
async function loadDashboard() {
    try {
        document.getElementById('wallet-balance').textContent = '₹ ' + (currentUser.balance || 0).toFixed(2);
        
        const matchesData = await apiService.getMatches();
        matchesList = matchesData.matches;
        loadMatches();
        
        // Show admin section if user is admin
        if (currentUser.role === 'admin') {
            document.getElementById('admin-link').style.display = 'block';
            document.getElementById('admin-create-section').style.display = 'block';
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Load Profile
async function loadProfile() {
    try {
        const stats = await apiService.getUserStats(currentUser.id);
        const matches = await apiService.getUserMatches(currentUser.id);
        
        document.getElementById('profile-name').textContent = currentUser.name;
        document.getElementById('profile-uid').textContent = 'UID: ' + currentUser.uid;
        
        document.getElementById('stat-matches').textContent = stats.stats.matches;
        document.getElementById('stat-wins').textContent = stats.stats.wins;
        document.getElementById('stat-earnings').textContent = '₹' + stats.stats.earnings;
        document.getElementById('stat-rating').textContent = stats.stats.rating;
        
        // Load match history
        const historyDiv = document.getElementById('match-history');
        historyDiv.innerHTML = '';
        matches.matches.forEach(match => {
            historyDiv.innerHTML += `
                <div class="match-history-item">
                    <strong>${match.title}</strong> - ${match.result.toUpperCase()} - ₹${match.prize}
                </div>
            `;
        });
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

// Load Leaderboard
async function loadLeaderboard(filter = 'all') {
    try {
        const data = await apiService.getLeaderboard(filter);
        const tbody = document.getElementById('leaderboard-body');
        
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        data.leaderboard.forEach((player, index) => {
            let rankClass = '';
            let rankEmoji = player.rank;
            
            if (player.rank === 1) {
                rankClass = 'gold';
                rankEmoji = '🥇';
            } else if (player.rank === 2) {
                rankClass = 'silver';
                rankEmoji = '🥈';
            } else if (player.rank === 3) {
                rankClass = 'bronze';
                rankEmoji = '🥉';
            }
            
            tbody.innerHTML += `
                <tr>
                    <td><span class="rank ${rankClass}">${rankEmoji}</span></td>
                    <td>${player.name}</td>
                    <td>${player.wins}</td>
                    <td>₹${player.earnings.toLocaleString()}</td>
                    <td>${player.rating}</td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('Error loading leaderboard:', error);
    }
}

// Join Match with API
async function joinMatch() {
    const ign = document.getElementById('join-ign').value;
    const uid = document.getElementById('join-uid').value;
    
    if (!ign || !uid) {
        showNotification('Please fill all details!', 'error');
        return;
    }
    
    try {
        const matchId = document.getElementById('join-match-id')?.value;
        const response = await apiService.joinMatch(matchId, {
            userId: currentUser.id,
            playerName: currentUser.name,
            ign: ign,
            uid: uid
        });
        
        showNotification('Successfully joined the match!', 'success');
        closeModal('registerModal');
        
        // Emit socket event
        socketManager.joinMatch(matchId, currentUser.id, currentUser.name);
    } catch (error) {
        showNotification('Error joining match: ' + error.message, 'error');
    }
}

// PhonePe Payment
async function proceedToPayment() {
    const amount = document.getElementById('add-amount').value;
    
    if (!amount || amount < 100) {
        showNotification('Minimum amount is ₹100', 'error');
        return;
    }
    
    try {
        const orderId = 'ORDER_' + Date.now();
        const paymentData = await apiService.initiatePhonePePayment(amount, orderId);
        
        if (paymentData.success) {
            // Redirect to PhonePe payment
            window.location.href = `${paymentData.paymentUrl}?payload=${paymentData.payload}&checksum=${paymentData.checksum}`;
        } else {
            showNotification('Payment initiation failed', 'error');
        }
    } catch (error) {
        showNotification('Error: ' + error.message, 'error');
    }
}

// Notification Helper
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease-in;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

// Handle Match Update
function handleMatchUpdate(data) {
    showNotification(`🎮 Match started! Room: ${data.roomId}`, 'success');
}

// Handle Match Results
function handleMatchResults(data) {
    showNotification(`🏆 Match ended! Winners: ${data.winners.join(', ')}`, 'success');
    loadLeaderboard();
}

// Logout
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    socketManager.socket?.disconnect();
    showPage('login');
    document.getElementById('login-form').reset();
    document.getElementById('signup-form').reset();
}
