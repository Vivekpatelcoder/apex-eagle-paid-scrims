// Razorpay Configuration
// Get your keys from: https://dashboard.razorpay.com/

const RAZORPAY_CONFIG = {
    keyId: 'YOUR_RAZORPAY_KEY_ID',
    keySecret: 'YOUR_RAZORPAY_KEY_SECRET',
    
    // Payment options
    paymentOptions: {
        currency: 'INR',
        theme: {
            color: '#ff4500'
        },
        upiMethods: {
            phonepe: true,
            googlepay: true,
            paytm: true,
            other: true
        }
    }
};

// Webhook URL for payment verification
const WEBHOOK_URL = 'https://your-server.com/api/razorpay/webhook';

if (typeof module !== 'undefined' && module.exports) {
    module.exports = RAZORPAY_CONFIG;
}
