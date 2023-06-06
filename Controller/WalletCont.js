const { responsecodes } = require("../Constants/ResponseCodes");
const { findWalletByUser, findWalletHistoryById } = require("../Service/WalletService")

const getWallet = async (req, res) => {
    console.log(req.user)
    try {
        const wallet = await findWalletByUser(req.user._id)

        res.status(responsecodes.SUCCESS).json(wallet);
    } catch (error) {
        res.status(responsecodes.BAD_REQUEST).json({ message: "Error occured", error });
    }
}

const getWalletHistory = async (req, res) => {
    try {
        const wallet = await findWalletByUser(req.user._id)
        const walletHistory = await findWalletHistoryById(wallet._id)
        res.status(responsecodes.SUCCESS).json(walletHistory)
    } catch (error) {
        res.status(responsecodes.BAD_REQUEST).json({ message: "Error occured", error });
    }
}

module.exports = { getWallet, getWalletHistory }