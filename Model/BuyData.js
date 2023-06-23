const mongoose = require('mongoose')

const BuyDataSchema = mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true
  },
  dataPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BuyData",
      required: true
  },
  msisdn: {
      type: String,
      required: true
  },
  transaction: {
      type: String,
      required: true
  }
}, {
    timestamps: true 
})

module.exports = mongoose.model('BuyData', BuyDataSchema)