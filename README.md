# 🦅 Apex Eagle Paid Scrims

**Free Fire Tournament Platform - Scrims, Ranked Matches & Prize Pools**

## Features 🎮
- ✅ Player Registration & Profiles
- ✅ Live Tournament Matchmaking
- ✅ Real-time Leaderboard & Rankings
- ✅ Razorpay Payment Integration (PhonePe, UPI, Cards)
- ✅ Admin Panel for Match Management
- ✅ Match Results & Winner Announcements
- ✅ User Authentication
- ✅ Responsive Mobile Design
- ✅ Dark Gaming Theme

## Tech Stack 🛠️
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Firebase (Firestore, Authentication)
- **Payments:** Razorpay (PhonePe, UPI, Cards)
- **Hosting:** GitHub Pages + Firebase

## Quick Start 🚀

### 1. Clone Repository
```bash
git clone https://github.com/Vivekpatelcoder/apex-eagle-paid-scrims.git
cd apex-eagle-paid-scrims
```

### 2. Setup Firebase
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create new project: "apex-eagle-paid-scrims"
- Enable Authentication (Email/Password)
- Create Firestore Database
- Copy config to `config/firebase-config.js`

### 3. Setup Razorpay
- Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
- Get API Key
- Add to `config/razorpay-config.js`

### 4. Run Locally
```bash
python -m http.server 8000
# or
node http-server
```
Visit `http://localhost:8000`

## Project Structure
```
apex-eagle-paid-scrims/
├── index.html              # Main app
├── pages/
│   ├── login.html
│   ├── dashboard.html
│   ├── leaderboard.html
│   ├── admin.html
│   └── profile.html
├── js/
│   ├── auth.js
│   ├── matches.js
│   ├── payments.js
│   ├── leaderboard.js
│   └── admin.js
├── css/
│   ├── main.css
│   ├── auth.css
│   ├── dashboard.css
│   └── admin.css
├── config/
│   ├── firebase-config.js
│   └── razorpay-config.js
└── README.md
```

## Features Details

### 🔐 Authentication
- Email/Password Login
- Google Sign-in
- Player UID Management
- Role-based Access (Player/Admin)

### 🎮 Tournament Management
- Create Scrims
- Squad Formation (1v1, 2v2, 4v4, Squads)
- Real-time Match Updates
- Winner Declaration
- Prize Distribution

### 💰 Payment System
- Razorpay Integration
- PhonePe UPI Support
- Automatic Refunds
- Transaction History

### 📊 Leaderboard
- Real-time Rankings
- Player Stats
- Tournament History
- Earnings

## Environment Variables
Create `.env` file:
```
FIREBASE_API_KEY=your_key
FIREBASE_PROJECT_ID=your_project
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

## Contributing
Pull requests welcome! For major changes, open an issue first.

## License
MIT

## Support
For issues, email: vivekpatelcoder@gmail.com

---
**Made with 🔥 for Free Fire Community**
