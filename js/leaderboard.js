// Leaderboard Module

let leaderboardData = [
    { rank: 1, name: 'ProGamer_X', wins: 45, earnings: 25000, rating: 2450 },
    { rank: 2, name: 'SniperKing', wins: 42, earnings: 23500, rating: 2380 },
    { rank: 3, name: 'ThunderStrike', wins: 38, earnings: 20000, rating: 2290 },
    { rank: 4, name: 'PhantomHunter', wins: 35, earnings: 18500, rating: 2150 },
    { rank: 5, name: 'ShadowAssassin', wins: 32, earnings: 16000, rating: 2050 },
    { rank: 6, name: 'IceBreaker', wins: 30, earnings: 15000, rating: 1950 },
    { rank: 7, name: 'NovaBlast', wins: 28, earnings: 14000, rating: 1850 },
    { rank: 8, name: 'VortexKiller', wins: 26, earnings: 13000, rating: 1750 },
    { rank: 9, name: 'ChaosMaster', wins: 24, earnings: 12000, rating: 1650 },
    { rank: 10, name: 'InfernoLord', wins: 22, earnings: 11000, rating: 1550 }
];

function loadLeaderboard(filter = 'all') {
    const tbody = document.getElementById('leaderboard-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    leaderboardData.forEach((player, index) => {
        let rankClass = '';
        let rankEmoji = index + 1;
        
        if (index === 0) {
            rankClass = 'gold';
            rankEmoji = '🥇';
        } else if (index === 1) {
            rankClass = 'silver';
            rankEmoji = '🥈';
        } else if (index === 2) {
            rankClass = 'bronze';
            rankEmoji = '🥉';
        }
        
        const isCurrentUser = currentUser && currentUser.name === player.name;
        const rowHTML = `
            <tr ${isCurrentUser ? "style='background: rgba(255, 69, 0, 0.1); font-weight: bold;'" : ''}>
                <td><span class="rank ${rankClass}">${rankEmoji}</span></td>
                <td>${player.name} ${isCurrentUser ? '(You)' : ''}</td>
                <td>${player.wins}</td>
                <td>₹${player.earnings.toLocaleString()}</td>
                <td>${player.rating}</td>
            </tr>
        `;
        
        tbody.innerHTML += rowHTML;
    });
}

function filterLeaderboard(filter) {
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // In real app, would fetch different data based on filter
    loadLeaderboard(filter);
}
