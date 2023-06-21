const mongoose = require('mongoose')

const DataPlanSchema = mongoose.Schema({
    network: {
        type: String,
        enum: ["mtn", "glo", "9mobile", "airtel"],
        required: true
    },
    planName: {
        type: String,
        required: true
    },
    planId: {
        type: Number,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        enum: ["mb", "gb"],
        required: true
    },
    validity: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["sme", "gifting", "corporate gifting"]
    },
    amount: {
        type: Number,
        default: 0,
        required: true
    },

},
    {
        timestamps: true
    })

module.exports = mongoose.model('DataPlan', DataPlanSchema)