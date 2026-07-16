// Email Service Utility
const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async sendWelcomeEmail(email, name) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: '🎮 Welcome to Apex Eagle Paid Scrims!',
            html: `
                <h2>Welcome ${name}!</h2>
                <p>You're all set to start your gaming journey.</p>
                <p>Check out our upcoming tournaments and start winning prizes! 🏆</p>
                <a href="https://apexeagle.com" style="background: #ff4500; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Start Playing</a>
            `
        };

        return await this.transporter.sendMail(mailOptions);
    }

    async sendMatchNotification(email, matchData) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `🎮 Match Starting: ${matchData.title}`,
            html: `
                <h2>Match Starting Soon!</h2>
                <p><strong>Match:</strong> ${matchData.title}</p>
                <p><strong>Time:</strong> ${new Date(matchData.time).toLocaleString('en-IN')}</p>
                <p><strong>Room ID:</strong> ${matchData.roomId}</p>
                <p><strong>Password:</strong> ${matchData.password}</p>
                <p>Good luck! 🚀</p>
            `
        };

        return await this.transporter.sendMail(mailOptions);
    }
}

module.exports = new EmailService();
