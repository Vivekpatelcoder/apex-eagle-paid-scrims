## Getting Started

### Install Dependencies
```bash
npm install
```

### Setup Environment
1. Copy `.env.example` to `.env`
2. Add your credentials:
   - Firebase
   - PhonePe
   - Email service
   - JWT secret

### Run Locally

**Backend:**
```bash
npm run dev
# Server at http://localhost:5000
```

**Frontend:**
```bash
# In another terminal
python -m http.server 8000
# Visit http://localhost:8000
```

### Run Both Together
```bash
npm install concurrently
npm run dev:all
```

## API Documentation

### Authentication
```
POST /api/auth/register
POST /api/auth/login
GET /api/auth/profile/:userId
```

### Matches
```
GET /api/matches
GET /api/matches/:matchId
POST /api/matches/create
POST /api/matches/:matchId/join
```

### Payments (PhonePe)
```
POST /api/payments/phonepe/initiate
POST /api/payments/phonepe/callback
GET /api/payments/phonepe/status/:transactionId
```

### Users
```
GET /api/users/:userId/stats
GET /api/users/:userId/matches
PUT /api/users/:userId
```

### Leaderboard
```
GET /api/leaderboard?filter=all
GET /api/leaderboard/tournament/:tournamentId
```

### Admin
```
GET /api/admin/stats
GET /api/admin/players
PUT /api/admin/players/:playerId/block
```

## Socket.io Events

### Client -> Server
- `join-match` - Join a match
- `match-started` - Start a match
- `match-ended` - End match and declare winners
- `chat-message` - Send chat message
- `stats-update` - Update player stats

### Server -> Client
- `player-joined` - New player joined
- `match-update` - Match started with room details
- `match-results` - Match results and winners
- `leaderboard-update` - Leaderboard changed
- `new-message` - New chat message

## Features

✅ Player Authentication
✅ Real-time Match Updates (Socket.io)
✅ PhonePe Payment Integration
✅ Email Notifications
✅ SMS Alerts (Twilio)
✅ Discord Bot Integration
✅ Admin Dashboard
✅ Leaderboard
✅ Match Management
✅ Player Stats
✅ Prize Distribution

## Support

Email: vivekpatelcoder@gmail.com

---

**Made with 🔥 for Free Fire Community**
