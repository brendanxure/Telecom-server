const { responsecodes } = require("../Constants/ResponseCodes")
const { BuyData } = require("../Service/DataPlanService")
const { debitWallet } = require("../Service/WalletService")


const DataPackage = async(req, res) => {
    const user = req.user
    const {network, size, unit, duration, type, amount } = req.body
    const dataPurchased = await BuyData(network, size, unit, duration, type, amount)
    if(dataPurchased.success) {
        // call the newtork api for data

        //if api to get data was successful
        if(true) {
            const updateWalletBalance = await debitWallet(user._id, amount)
            if (updateWalletBalance.success) {
                res.status(updateWalletBalance.code).json({message: 'Data Bought Successfully', walletBalance: updateWalletBalance.wallet?.balance })
            }else {
                res.status(updateWalletBalance.code).json({message: updateWalletBalance.message}) 
            }
        } 
    } else {
        return res.status(dataPurchased.code).json({message: dataPurchased.message, error: dataPurchased.data})
    }
}

module.exports = {DataPackage}