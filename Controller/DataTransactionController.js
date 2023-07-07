const { responsecodes } = require("../Constants/ResponseCodes")
const { findDataTransactionByUser, findDataTransactionByUserByDates } = require("../Service/DataTransactionService")

//get Data Transactions for user
const dataTransactionByUser = async(req, res) => {
    const user = req.user
    
    const dataTransaction = await findDataTransactionByUser(user)
    if(!dataTransaction.success) {
        res.status(dataTransaction.code).json(dataTransaction.data)
    }
    res.status(dataTransaction.code).json(dataTransaction.data.reverse())     
}

//get data transactions for user by dates

const dataTransactionByUserByDates = async(req, res) => {
    const user = req.user

    const {startDate, endDate} = req.body

    if(!startDate){
        res.status(responsecodes.BAD_REQUEST).json('Please input start date')
    }
    if(!endDate){
        res.status(responsecodes.BAD_REQUEST).json('Please input end date')
    }

    const dataTransaction = await findDataTransactionByUserByDates(user, startDate, endDate)
    if(!dataTransaction.success) {
        res.status(dataTransaction.code).json(dataTransaction.data)
    }
    res.status(dataTransaction.code).json(dataTransaction.data)
}

module.exports = {dataTransactionByUser, dataTransactionByUserByDates}