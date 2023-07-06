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

module.exports = {findDataTransactionByUser}