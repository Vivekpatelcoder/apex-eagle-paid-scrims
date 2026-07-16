// SMS Service (Twilio Integration)
const twilio = require('twilio');

class SMSService {
    constructor() {
        this.client = twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );
        this.fromNumber = process.env.TWILIO_PHONE_NUMBER;
    }

    async sendMatchAlert(phoneNumber, matchData) {
        try {
            await this.client.messages.create({
                body: `🎮 Match Alert: ${matchData.title}\nRoom: ${matchData.roomId}\nPassword: ${matchData.password}\nGood luck! 🚀`,
                from: this.fromNumber,
                to: phoneNumber
            });
        } catch (error) {
            console.error('SMS error:', error.message);
        }
    }

    async sendWinnerNotification(phoneNumber, prizeAmount) {
        try {
            await this.client.messages.create({
                body: `🏆 Congratulations! You won ₹${prizeAmount}! Check your wallet for details.`,
                from: this.fromNumber,
                to: phoneNumber
            });
        } catch (error) {
            console.error('SMS error:', error.message);
        }
    }
}

module.exports = new SMSService();
