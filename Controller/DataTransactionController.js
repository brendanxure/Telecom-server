const { findDataTransactionByUser } = require("../Service/DataTransactionService")


const dataTransactionByUser = async(req, res) => {
    const user = req.user
    
    const dataTransaction = await findDataTransactionByUser(user)
    if(!dataTransaction.success) {
        res.status(dataTransaction.code).json(dataTransaction.data)
    }
    res.status(dataTransaction.code).json(dataTransaction.data)     
}

module.exports = {dataTransactionByUser}