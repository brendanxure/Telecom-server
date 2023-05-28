const mongoose = require('mongoose');

const walletHistorySchema = new mongoose.Schema({
    walletId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet',
        required: true
    },
    transactionType: {
        type: String,
        enum: ['Funding', 'Withdrawal'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const WalletHistory = mongoose.model('WalletHistory', walletHistorySchema);

module.exports = WalletHistory;