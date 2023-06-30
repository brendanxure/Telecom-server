const mongoose = require('mongoose')

const BuyDataSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    dataPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DataPlan",
        required: true
    },
    msisdn: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'processing', 'failed'],
        default: 'pending',
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('BuyData', BuyDataSchema)