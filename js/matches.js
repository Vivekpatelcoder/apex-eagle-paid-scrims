// Matches Module

let matchesList = [
    {
        id: 1,
        title: 'Sunday Clash Squad (4v4)',
        type: '4v4',
        time: '2024-07-21 18:00',
        entry: 50,
        prize: 5000,
        slots: '32/40',
        status: 'registration',
        map: 'Bermuda',
        participants: 32
    },
    {
        id: 2,
        title: 'Elite Solo Battle Royale',
        type: 'Solo',
        time: '2024-07-20 20:00',
        entry: 100,
        prize: 10000,
        slots: '45/50',
        status: 'live',
        map: 'Kalahari',
        participants: 45
    },
    {
        id: 3,
        title: 'Duo Champions League',
        type: '2v2',
        time: '2024-07-22 19:30',
        entry: 0,
        prize: 2000,
        slots: '15/20',
        status: 'registration',
        map: 'Purgatory',
        participants: 15
    }
];

function loadMatches() {
    const container = document.getElementById('matches-container');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    matchesList.forEach(match => {
        const statusBadge = match.status === 'live' ? '🔴 LIVE' : '⏳ Registration';
        const statusClass = match.status === 'live' ? 'live' : 'registration';
        
        container.innerHTML += `
            <div class="match-card">
                <div class="match-status ${statusClass}">${statusBadge}</div>
                <div class="match-title">${match.title}</div>
                <div class="match-info"><strong>Type:</strong> ${match.type}</div>
                <div class="match-info"><strong>Map:</strong> ${match.map}</div>
                <div class="match-info"><strong>Date & Time:</strong> ${new Date(match.time).toLocaleString('en-IN')}</div>
                <div class="match-info"><strong>Entry Fee:</strong> ${match.entry === 0 ? '🎉 Free' : '₹' + match.entry}</div>
                <div class="match-info"><strong>Prize Pool:</strong> ₹${match.prize.toLocaleString()}</div>
                <div class="match-info"><strong>Slots:</strong> ${match.slots}</div>
                <div class="match-actions">
                    <button onclick="openRegisterModal(${match.id})">🎮 Join Tournament</button>
                    <button class="secondary" onclick="viewMatchDetails(${match.id})">📋 Details</button>
                </div>
            </div>
        `;
    });
}

function viewMatchDetails(matchId) {
    const match = matchesList.find(m => m.id === matchId);
    if (match) {
        alert(`Match Details:\n\nTitle: ${match.title}\nType: ${match.type}\nPrize: ₹${match.prize}\nParticipants: ${match.participants}`);
    }
}

function loadAdminMatches() {
    const container = document.getElementById('admin-matches-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    matchesList.forEach(match => {
        container.innerHTML += `
            <div class="admin-item">
                <div class="admin-item-info">
                    <h4>${match.title}</h4>
                    <p>${match.type} • ${match.participants} participants</p>
                </div>
                <div class="admin-item-actions">
                    <button onclick="editMatch(${match.id})">Edit</button>
                    <button onclick="viewParticipants(${match.id})">Participants</button>
                    <button onclick="deleteMatch(${match.id})">Delete</button>
                </div>
            </div>
        `;
    });
}

function editMatch(matchId) {
    alert('Edit match ' + matchId + ' - Coming soon!');
}

function viewParticipants(matchId) {
    const match = matchesList.find(m => m.id === matchId);
    alert('Participants for ' + match.title + ': ' + match.participants);
}

function deleteMatch(matchId) {
    if (confirm('Are you sure you want to delete this match?')) {
        matchesList = matchesList.filter(m => m.id !== matchId);
        loadAdminMatches();
        alert('Match deleted!');
    }
}
