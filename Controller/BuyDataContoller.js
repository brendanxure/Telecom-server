const axios = require('axios')
const { debitWallet } = require("../Service/WalletService")
const buyDataService = require("../Service/BuyDataService")
const { responsecodes, transactionstatus } = require("../Constants/ResponseCodes")


const BuyDataPlan = async (req, res) => {
    try {
        const { amount, msisdn, dataplanId, planId } = req.body
        const user = req.user
        const buyData = await buyDataService.initialiseGloBuyData(user._id, amount, msisdn, dataplanId);

        const transId = buyData.transactionId;
        const bucketId = 23;
        const quantity = 1;
        const ignoresms = false;
        const sponsorId = process.env.GLO_SPONSOR_ID;
        const headers = {
            'x-api-key': process.env.GLO_API_KEY,
            'Content-Type': 'application/json'
        }

        const response = await axios.post('https://gift-api.gloworld.com', { transId, msisdn, bucketId, planId, sponsorId, quantity, ignoresms }, { headers });
        console.log(" response" + JSON.stringify(response.data))
        const { status, resultCode, egmstransId, expire, balance, message } = response.data;

        console.log('tId' + response.data.transId);
        const rTransId = response.data.transId
        const rQuantity = response.data.quantity

        if (status === 'ok') {
            console.log("ok")

            const updateWalletBalance = await debitWallet(user._id, amount);
            if (updateWalletBalance.success) {
                if (resultCode === "0000") {
                    const verifyPurchase = await buyDataService.findByTransactionId(rTransId);
                    if (verifyPurchase.success) {
                        const dataUpdate = await buyDataService.updateBuyDataStatus(verifyPurchase.data, transactionstatus.COMPLETE);
                        const responseLog = await createResponseLog(buyData, status, resultCode, egmstransId, rTransId, expire, balance, rQuantity, message);
                        return res.status(responsecodes.SUCCESS).json({ message: 'Data Purchased Successfully', walletBalance: updateWalletBalance.wallet?.balance, update: dataUpdate, gloresponseLog: responseLog })
                    }
                }
                else if (resultCode === "0002") {
                    const verifyPurchase = await buyDataService.findByTransactionId(rTransId)
                    const dataUpdate = await buyDataService.updateBuyDataStatus(verifyPurchase.data, transactionstatus.PROCESSING);
                    const responseLog = await createResponseLog(buyData, status, resultCode, egmstransId, rTransId, expire, balance, rQuantity, message);
                    return res.status(responsecodes.SUCCESS).json({ message: message, walletBalance: updateWalletBalance.wallet?.balance, update: dataUpdate, gloresponseLog: responseLog })
                }
            } // the admin has to know that the user wallet wasnt debited but data was given
            else {
                const responseLog = await createResponseLog(buyData, status, resultCode, egmstransId, rTransId, expire, balance, quantrQuantityity, message);
                return res.status(updateWalletBalance.code).json({ message: updateWalletBalance.message, gloresponseLog: responseLog })
            }
        }
        else if (status === "error") {
            console.log("here error failed ")
            const verifyPurchase = await buyDataService.findByTransactionId(rTransId)
            const dataUpdate = await buyDataService.updateBuyDataStatus(verifyPurchase.data, transactionstatus.FAILED);
            const responseLog = await createResponseLog(buyData, status, resultCode, egmstransId, rTransId, expire, balance, rQuantity, message);
            return res.status(responsecodes.INTERNAL_SERVER_ERROR).json({ message: message, update: dataUpdate, gloresponseLog: responseLog })

        }
    } catch (error) {
        if (error.response) {
            return res.status(responsecodes.INTERNAL_SERVER_ERROR).json({success: false, message: 'An error occurred while buying data due to ' + error.response.message })
        }
        return res.status(responsecodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'An error occurred while buying data due to ' + error });
    }


};

//get all glo Data transaction
const getAllGloDataTransactions = async(req, res)=> {
    try {
        const gloDataTransactions = await buyDataService.findAllGloDataTransactions()
        if(gloDataTransactions.success){
            res.status(gloDataTransactions.code).json(gloDataTransactions.data)
        } else {
            res.status(gloDataTransactions.code).json(gloDataTransactions.message)
        }
    } catch (error) {
        if(error.message){
            res.status(error.code).json(error.message)
        }else {
            res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
        }
        
    }
}

module.exports = { BuyDataPlan, getAllGloDataTransactions }

async function createResponseLog(buyData, status, resultCode, egmstransId, transId, expire, balance, quantity, message) {
    const responseData = {
        buyData: buyData._id,
        status: status,
        resultCode: resultCode,
        egmstransId: egmstransId,
        transId: transId,
        expire: expire,
        balance: balance,
        quantity: quantity,
        message: message
    };
    await buyDataService.createGloDataResponseLog(responseData);
}

