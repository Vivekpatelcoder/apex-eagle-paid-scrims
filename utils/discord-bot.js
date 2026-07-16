// Discord Bot Integration
const axios = require('axios');

class DiscordBot {
    constructor() {
        this.webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    }

    async sendMatchUpdate(matchData) {
        try {
            const embed = {
                title: `🎮 ${matchData.title}`,
                description: `Match Status: ${matchData.status}`,
                color: 0xff4500,
                fields: [
                    {
                        name: 'Type',
                        value: matchData.type,
                        inline: true
                    },
                    {
                        name: 'Prize Pool',
                        value: `₹${matchData.prize}`,
                        inline: true
                    },
                    {
                        name: 'Participants',
                        value: `${matchData.participants}/${matchData.maxSlots}`,
                        inline: true
                    },
                    {
                        name: 'Entry Fee',
                        value: `₹${matchData.entry}`,
                        inline: true
                    }
                ],
                timestamp: new Date()
            };

            await axios.post(this.webhookUrl, { embeds: [embed] });
        } catch (error) {
            console.error('Discord error:', error.message);
        }
    }

    async sendWinnerAnnouncement(winner) {
        try {
            const embed = {
                title: '🏆 MATCH WINNER!',
                description: `${winner.playerName} won!`,
                color: 0xffd700,
                fields: [
                    {
                        name: 'Prize',
                        value: `₹${winner.prize}`,
                        inline: true
                    },
                    {
                        name: 'Match',
                        value: winner.matchTitle,
                        inline: true
                    }
                ]
            };

            await axios.post(this.webhookUrl, { embeds: [embed] });
        } catch (error) {
            console.error('Discord error:', error.message);
        }
    }
}

module.exports = new DiscordBot();
