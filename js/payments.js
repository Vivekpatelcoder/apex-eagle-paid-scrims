// Payments Module - Razorpay Integration

const RAZORPAY_KEY = 'YOUR_RAZORPAY_KEY_HERE'; // Replace with your key

function initiateRazorpayPayment(amount) {
    const options = {
        key: RAZORPAY_KEY,
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        name: 'Apex Eagle Paid Scrims',
        description: 'Add Money to Wallet',
        image: '🦅',
        handler: function(response) {
            handlePaymentSuccess(response, amount);
        },
        prefill: {
            name: currentUser?.name || '',
            email: currentUser?.email || '',
            contact: '9999999999'
        },
        notes: {
            userId: currentUser?.id,
            purpose: 'wallet_recharge'
        },
        theme: {
            color: '#ff4500'
        }
    };
    
    // Check if Razorpay script is loaded
    if (typeof Razorpay !== 'undefined') {
        const rzp = new Razorpay(options);
        rzp.open();
    } else {
        loadRazorpayScript(() => {
            const rzp = new Razorpay(options);
            rzp.open();
        });
    }
}

function loadRazorpayScript(callback) {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = callback;
    document.body.appendChild(script);
}

function handlePaymentSuccess(response, amount) {
    console.log('Payment successful:', response);
    
    // Update user balance
    if (currentUser) {
        currentUser.balance = (currentUser.balance || 0) + amount;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    alert('✅ Payment successful!\n\nAmount: ₹' + amount + ' credited to your wallet.');
    
    closeModal('addMoneyModal');
    document.getElementById('add-amount').value = '';
    loadDashboard();
}

function handlePaymentFailure(error) {
    console.error('Payment failed:', error);
    alert('❌ Payment failed. Please try again.');
}

// Process match entry fee
function processMatchEntryFee(matchId, entryFee) {
    if (entryFee === 0) {
        joinMatchFree(matchId);
        return;
    }
    
    if (currentUser.balance < entryFee) {
        alert('Insufficient balance! Please add money to your wallet.');
        return;
    }
    
    // Deduct from wallet and join
    currentUser.balance -= entryFee;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    alert('✅ Entry fee deducted. You have joined the match!');
    loadDashboard();
}

function joinMatchFree(matchId) {
    alert('✅ You have joined the match!');
}
