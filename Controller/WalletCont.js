const { responsecodes } = require("../Constants/ResponseCodes");
const { findWalletByUser, findWalletHistory } = require("../Service/WalletService")

const getWallet = async (req, res) => {
    try {
        const response = await findWalletByUser(req.user._id)
        console.log(response)
        res.status(responsecodes.SUCCESS).json(response);
    } catch (error) {
        res.status(responsecodes.BAD_REQUEST).json({ message: "Error occured", error });
    }
}

const getWalletHistory = async(req, res)=> {
    try {
        const response = await findWalletByUser(req.user._id)
        const walletId = response._id
        console.log(walletId)
        const response2 = await findWalletHistory(walletId)
        console.log(response2)
        res.status(responsecodes.SUCCESS).json(response2)
    } catch (error) {
        res.status(responsecodes.BAD_REQUEST).json({ message: "Error occured", error });
    }
}

module.exports = {getWallet, getWalletHistory}