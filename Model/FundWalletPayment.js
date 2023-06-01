const mongoose = require('mongoose');

const FundWalletPaymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
    },
    reference: {
        type: String,
        required: [true, 'Please input reference'],
        unique: true
    },
    currency: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('FundWalletPayment', FundWalletPaymentSchema);
