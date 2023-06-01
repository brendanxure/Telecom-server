const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
    receiptNumber: {
        type: String,
        required: true,
        unique: true,
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FundWalletPayment',
        required: true,
    },
    amountPaid: {
        type: Number,
        required: true,
    },
    paymentDate: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Receipt', ReceiptSchema);
