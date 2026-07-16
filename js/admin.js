// Admin Module

let playersList = [
    { id: 1, name: 'Player1', email: 'player1@gmail.com', uid: '123456789', status: 'active', balance: 500 },
    { id: 2, name: 'Player2', email: 'player2@gmail.com', uid: '987654321', status: 'active', balance: 1000 },
    { id: 3, name: 'Player3', email: 'player3@gmail.com', uid: '456789123', status: 'blocked', balance: 0 },
    { id: 4, name: 'Player4', email: 'player4@gmail.com', uid: '789123456', status: 'active', balance: 2500 },
    { id: 5, name: 'Player5', email: 'player5@gmail.com', uid: '321654987', status: 'active', balance: 1500 }
];

let payoutsList = [
    { id: 1, player: 'ProGamer_X', amount: 5000, status: 'completed', date: '2024-07-15' },
    { id: 2, player: 'SniperKing', amount: 3500, status: 'pending', date: '2024-07-16' },
    { id: 3, player: 'ThunderStrike', amount: 4200, status: 'completed', date: '2024-07-14' },
    { id: 4, player: 'PhantomHunter', amount: 2800, status: 'failed', date: '2024-07-16' }
];

function loadAdminPlayers() {
    const container = document.getElementById('admin-players-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    playersList.forEach(player => {
        const statusBadge = player.status === 'active' 
            ? '<span style="color: var(--success);">✓ Active</span>' 
            : '<span style="color: var(--danger);">✗ Blocked</span>';
        
        container.innerHTML += `
            <div class="admin-item">
                <div class="admin-item-info">
                    <h4>${player.name}</h4>
                    <p>UID: ${player.uid} • ${player.email} • ${statusBadge}</p>
                </div>
                <div class="admin-item-actions">
                    <button onclick="viewPlayerStats(${player.id})">Stats</button>
                    <button onclick="togglePlayerStatus(${player.id})">Block/Unblock</button>
                </div>
            </div>
        `;
    });
}

function loadPayoutsList() {
    const container = document.getElementById('admin-payouts-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    payoutsList.forEach(payout => {
        let statusBadge = '';
        if (payout.status === 'completed') statusBadge = '✓ Completed';
        else if (payout.status === 'pending') statusBadge = '⏳ Pending';
        else if (payout.status === 'failed') statusBadge = '✗ Failed';
        
        container.innerHTML += `
            <div class="admin-item">
                <div class="admin-item-info">
                    <h4>${payout.player}</h4>
                    <p>Amount: ₹${payout.amount} • Date: ${payout.date} • ${statusBadge}</p>
                </div>
                <div class="admin-item-actions">
                    <button onclick="processPayout(${payout.id})">Process</button>
                    <button onclick="removePayout(${payout.id})">Remove</button>
                </div>
            </div>
        `;
    });
}

function loadAnalytics() {
    document.getElementById('analytics-players').textContent = playersList.length;
    document.getElementById('analytics-matches').textContent = matchesList.length;
    document.getElementById('analytics-revenue').textContent = '₹ ' + (150000).toLocaleString();
    document.getElementById('analytics-prizes').textContent = '₹ ' + (95000).toLocaleString();
}

function viewPlayerStats(playerId) {
    const player = playersList.find(p => p.id === playerId);
    alert(`Player Stats:\n\nName: ${player.name}\nUID: ${player.uid}\nEmail: ${player.email}\nBalance: ₹${player.balance}`);
}

function togglePlayerStatus(playerId) {
    const player = playersList.find(p => p.id === playerId);
    player.status = player.status === 'active' ? 'blocked' : 'active';
    loadAdminPlayers();
}

function processPayout(payoutId) {
    const payout = payoutsList.find(p => p.id === payoutId);
    payout.status = 'completed';
    loadPayoutsList();
    alert('Payout processed successfully!');
}

function removePayout(payoutId) {
    payoutsList = payoutsList.filter(p => p.id !== payoutId);
    loadPayoutsList();
}
