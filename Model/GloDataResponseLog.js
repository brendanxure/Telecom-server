const mongoose = require('mongoose');

const GloDataResponseLogSchema = new mongoose.Schema({
    buyData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BuyData",
        required: true
    },
    status: {
        type: String,
        required: true
    },
    resultCode: {
        type: String,
        required: true
    },
    egmstransId: {
        type: String,
        required: true
    },
    transId: {
        type: String,
        required: true
    },
    expire: {
        type: Date,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const GloDataResponseLog = mongoose.model('GloDataResponseLog', GloDataResponseLogSchema);

module.exports = GloDataResponseLog;
