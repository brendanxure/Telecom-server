const { responsecodes } = require("../Constants/ResponseCodes")
const { findDataTransactionByUser, findDataTransactionByUserByDates, findAllGloDataTransactions } = require("../Service/DataTransactionService")

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

//get all glo Data transaction
const getAllGloDataTransactions = async(req, res)=> {
    try {
        const gloDataTransactions = await findAllGloDataTransactions()
        if(gloDataTransactions.success){
            res.status(gloDataTransactions.code).json(gloDataTransactions.data.reverse())
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

module.exports = {dataTransactionByUser, dataTransactionByUserByDates, getAllGloDataTransactions }