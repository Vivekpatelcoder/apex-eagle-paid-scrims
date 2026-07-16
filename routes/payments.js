const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// PhonePe Integration
router.post('/phonepe/initiate', async (req, res) => {
    try {
        const { userId, amount, orderId } = req.body;

        // PhonePe API Configuration
        const merchantId = process.env.PHONEPE_MERCHANT_ID;
        const apiKey = process.env.PHONEPE_API_KEY;
        const apiIndex = process.env.PHONEPE_API_INDEX;

        // Request payload
        const payload = {
            merchantId: merchantId,
            merchantTransactionId: orderId,
            merchantUserId: userId,
            amount: amount * 100, // Convert to paise
            redirectUrl: `${process.env.PHONEPE_CALLBACK_URL}?orderId=${orderId}`,
            redirectMode: 'REDIRECT',
            callbackUrl: process.env.PHONEPE_CALLBACK_URL,
            mobileNumber: '',
            paymentInstrument: {
                type: 'UPI'
            }
        };

        // Encode payload
        const payloadString = JSON.stringify(payload);
        const payloadBase64 = Buffer.from(payloadString).toString('base64');

        // Create checksum
        const string = payloadBase64 + '/pg/v1/pay' + apiKey;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + apiIndex;

        res.json({
            success: true,
            paymentUrl: `https://api.phonepe.com/apis/hermes/pg/v1/pay`,
            payload: payloadBase64,
            checksum: checksum,
            merchantId: merchantId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PhonePe Callback
router.post('/phonepe/callback', async (req, res) => {
    try {
        const { transactionId, code } = req.body;

        if (code === 'PAYMENT_SUCCESS') {
            // Update user balance in database
            res.json({
                success: true,
                message: 'Payment successful',
                transactionId: transactionId
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Payment failed',
                code: code
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Check payment status
router.get('/phonepe/status/:transactionId', async (req, res) => {
    try {
        const merchantId = process.env.PHONEPE_MERCHANT_ID;
        const apiKey = process.env.PHONEPE_API_KEY;
        const { transactionId } = req.params;

        // Create checksum for status check
        const string = merchantId + transactionId + apiKey;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###1';

        res.json({
            transactionId: transactionId,
            status: 'pending', // Replace with actual API call
            checksum: checksum
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get transaction history
router.get('/history/:userId', (req, res) => {
    try {
        // Mock data - Replace with database
        const transactions = [
            {
                id: '1',
                userId: req.params.userId,
                type: 'credit',
                amount: 500,
                method: 'PhonePe',
                status: 'success',
                timestamp: new Date()
            }
        ];

        res.json({ transactions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
