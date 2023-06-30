const axios = require('axios')
const { debitWallet } = require("../Service/WalletService")
const buyDataService = require("../Service/BuyDataService")
const { responsecodes, transactionstatus } = require("../Constants/ResponseCodes")


const BuyDataPlan = async (req, res) => {

    const { amount, msisdn, dataplanId, planId } = req.body
    const user = req.user
    const buyData = await buyDataService.initialiseGloBuyData(user._id, amount, msisdn, dataplanId)
    const headers = {
        'x-api-key': process.env.GLO_API_KEY,
        'Content-Type': 'application/json'
    }
    const request = {
        transId: buyData.transactionId,
        msisdn: msisdn,
        bucketId: 23,
        planId: planId,
        sponsorId: process.env.GLO_SPONSOR_ID,
        quantity: 1,
        ignoresms: false
    }

    const response = await axios.post('https://gift-api.gloworld.com', { request }, { headers });
    console.log(" response" + response)
    console.log(" response" + response.data)

    const { status, resultCode, egmstransId, transId, volume, expire, balance, quantity, message } = response.data;

    console.log("status" + status)

    // Save Response to Reponse Log
    const responseData = {
        buyData: buyData._id,
        status: status,
        resultCode: resultCode,
        egmstransId: egmstransId,
        transId: transId,
        volume: volume,
        expire: expire,
        balance: balance,
        quantity: quantity,
        message: message
    };
    await buyDataService.createGloDataResponseLog(responseData);
    console.log("here")

    if (status === 'ok') {
        console.log("ok")

        const updateWalletBalance = await debitWallet(user._id, amount);
        if (updateWalletBalance.success) {
            if (resultCode === "0000") {
                const verifyPurchase = await buyDataService.findByTransactionId(transId);
                if (verifyPurchase.success) {
                    await buyDataService.updateBuyDataStatus(verifyPurchase.data, transactionstatus.COMPLETE);
                    return res.status(responsecodes.SUCCESS).json({ message: 'Data Purchased Successfully', walletBalance: updateWalletBalance.wallet?.balance })
                }
            }
            else if (resultCode === "0002") {
                await buyDataService.updateBuyDataStatus(verifyPurchase.data, transactionstatus.PROCESSING);
                return res.status(responsecodes.SUCCESS).json({ message: message, walletBalance: updateWalletBalance.wallet?.balance })
            }
        }
        else {
            res.status(updateWalletBalance.code).json({ message: updateWalletBalance.message })
        }
    }
    else if (status === "error") {
        console.log("here error failed ")
        await buyDataService.updateBuyDataStatus(verifyPurchase.data, transactionstatus.FAILED);
        return res.status(responsecodes.INTERNAL_SERVER_ERROR).json({ message: message })

    }

};

module.exports = { BuyDataPlan }

