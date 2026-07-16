const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Email transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Send match start notification
router.post('/match-start', async (req, res) => {
    try {
        const { email, matchTitle, roomId, password } = req.body;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `🎮 Your Match is Starting: ${matchTitle}`,
            html: `
                <h2>Match Starting Soon!</h2>
                <p><strong>Match:</strong> ${matchTitle}</p>
                <p><strong>Room ID:</strong> ${roomId}</p>
                <p><strong>Password:</strong> ${password}</p>
                <p>Get ready to play! 🚀</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Send payment confirmation
router.post('/payment-confirmation', async (req, res) => {
    try {
        const { email, amount, transactionId } = req.body;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: '✅ Payment Confirmed - Apex Eagle',
            html: `
                <h2>Payment Successful!</h2>
                <p><strong>Amount:</strong> ₹${amount}</p>
                <p><strong>Transaction ID:</strong> ${transactionId}</p>
                <p>Your wallet has been credited. Ready to play! 🎮</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: 'Confirmation email sent' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Send winner announcement
router.post('/winner-announcement', async (req, res) => {
    try {
        const { email, playerName, prizeAmount, matchTitle } = req.body;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: '🏆 Congratulations! You Won!',
            html: `
                <h2>🎉 Congratulations ${playerName}!</h2>
                <p>You won the match: <strong>${matchTitle}</strong></p>
                <p><strong>Prize Amount:</strong> ₹${prizeAmount}</p>
                <p>Your prize will be credited to your account within 24 hours.</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: 'Winner notification sent' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
