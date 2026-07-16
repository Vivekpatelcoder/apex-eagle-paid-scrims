// Main App Controller

let currentUser = null;
let currentPage = 'login';

// Initialize App
window.addEventListener('load', () => {
    initializeApp();
});

function initializeApp() {
    // Check if user is logged in
    const storedUser = localStorage.getItem('currentUser');
    
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        
        if (storedUser) {
            currentUser = JSON.parse(storedUser);
            showPage('dashboard');
            loadDashboard();
        } else {
            showPage('login');
        }
    }, 1500);
}

// Page Navigation
function showPage(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    
    // Show selected page
    const targetPage = document.getElementById(page + '-page');
    if (targetPage) {
        targetPage.classList.remove('hidden');
        currentPage = page;
        
        // Load page-specific data
        if (page === 'dashboard') loadDashboard();
        if (page === 'leaderboard') loadLeaderboard();
        if (page === 'profile') loadProfile();
        if (page === 'admin') loadAdminPanel();
    }
}

// Modal Functions
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

// Close modals on background click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Authentication Functions
function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active-form'));
    
    event.target.classList.add('active');
    
    if (tab === 'login') {
        document.getElementById('login-form').classList.add('active-form');
    } else {
        document.getElementById('signup-form').classList.add('active-form');
    }
}

// Login
document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simulate login (In real app, use Firebase)
    currentUser = {
        id: 'user_' + Date.now(),
        email: email,
        name: email.split('@')[0],
        uid: '123456789',
        balance: 0,
        role: 'player'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showPage('dashboard');
    loadDashboard();
});

// Signup
document.getElementById('signup-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const uid = document.getElementById('signup-uid').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    
    if (password !== confirm) {
        alert('Passwords do not match!');
        return;
    }
    
    // Simulate signup (In real app, use Firebase)
    currentUser = {
        id: 'user_' + Date.now(),
        email: email,
        name: name,
        uid: uid,
        balance: 0,
        role: 'player'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showPage('dashboard');
    loadDashboard();
});

// Logout
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showPage('login');
    
    // Clear forms
    document.getElementById('login-form').reset();
    document.getElementById('signup-form').reset();
}

// Dummy Functions
function loginWithGoogle() {
    alert('Google Login - Coming Soon!');
}

function loadDashboard() {
    // Load wallet balance
    document.getElementById('wallet-balance').textContent = '₹ ' + (currentUser.balance || 0).toFixed(2);
    
    // Load matches
    loadMatches();
}

function loadProfile() {
    document.getElementById('profile-name').textContent = currentUser.name;
    document.getElementById('profile-uid').textContent = 'UID: ' + currentUser.uid;
    
    // Load stats
    document.getElementById('stat-matches').textContent = '5';
    document.getElementById('stat-wins').textContent = '2';
    document.getElementById('stat-earnings').textContent = '₹500';
    document.getElementById('stat-rating').textContent = '1250';
}

function updateProfile() {
    alert('Profile update coming soon!');
}

function changePassword() {
    alert('Password change coming soon!');
}

// Modals
function openAddMoneyModal() {
    openModal('addMoneyModal');
}

function openRegisterModal(matchId) {
    openModal('registerModal');
}

function openCreateMatchModal() {
    if (!currentUser || currentUser.role !== 'admin') {
        alert('Admin access required!');
        return;
    }
    openModal('createMatchModal');
}

function setAmount(amount) {
    document.getElementById('add-amount').value = amount;
}

function proceedToPayment() {
    const amount = document.getElementById('add-amount').value;
    
    if (!amount || amount < 100) {
        alert('Minimum amount is ₹100');
        return;
    }
    
    // Initialize Razorpay payment
    initiateRazorpayPayment(amount);
}

function joinMatch() {
    const ign = document.getElementById('join-ign').value;
    const uid = document.getElementById('join-uid').value;
    
    if (!ign || !uid) {
        alert('Please fill all details!');
        return;
    }
    
    alert('Congratulations! You have joined the match.\nWait for the admin to confirm.');
    closeModal('registerModal');
}

// Admin
function switchAdminTab(tab) {
    document.querySelectorAll('.admin-tab').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.admin-tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById('admin-' + tab).classList.add('active');
}

function loadAdminPanel() {
    if (!currentUser || currentUser.role !== 'admin') {
        showPage('dashboard');
        return;
    }
    
    loadAdminMatches();
    loadAdminPlayers();
    loadAnalytics();
}

function createMatch() {
    const title = document.getElementById('match-title').value;
    const type = document.getElementById('match-type').value;
    const time = document.getElementById('match-time').value;
    const entry = document.getElementById('match-entry').value || 0;
    const prize = document.getElementById('match-prize').value;
    const slots = document.getElementById('match-slots').value || 50;
    
    if (!title || !time || !prize) {
        alert('Please fill all required fields!');
        return;
    }
    
    alert('Match created successfully!');
    closeModal('createMatchModal');
    loadDashboard();
}

// Utilities
function showNotification(message, type = 'success') {
    console.log(type.toUpperCase() + ': ' + message);
}
