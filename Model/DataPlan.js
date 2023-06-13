const mongoose = require('mongoose')

const DataPlanSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    network: {
        type: String,
        enum: ["mtn", "glo", "9mobile", "airtel"],
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        enum: ["mb", "gb"],
        required: true
    },
    duration: {
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

}, {
   timestamps: true 
})

module.exports = mongoose.model('DataPlan', DataPlanSchema)