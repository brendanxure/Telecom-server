const { responsecodes } = require("../Constants/ResponseCodes")
const BuyData = require("../Model/BuyData")


const findDataTransactionByUser = async(user)=> {
    try {
        const dataTransaction = await BuyData.find({user: user})
        return {code: responsecodes.SUCCESS, success: true, data: dataTransaction}
    } catch (error) {
        return {code: responsecodes.INTERNAL_SERVER_ERROR, success: false, data: error}
    }
}

const findDataTransactionByUserByDates = async(user, startDate, endDate) => {
    try {
        const endateTime = "T23:59:59.999Z"
        const transactionByDates = await BuyData.find({user: user, createdAt: {$gte: new Date(startDate), $lte: new Date(endDate + endateTime)}})
        return {code: responsecodes.SUCCESS, success: true, data: transactionByDates}
    } catch (error) {
        return {code: responsecodes.INTERNAL_SERVER_ERROR, success: false, data: error}
    }
}

module.exports = {findDataTransactionByUser, findDataTransactionByUserByDates}