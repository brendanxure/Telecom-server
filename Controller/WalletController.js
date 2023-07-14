const Wallet = require('../Model/Wallet');
const WalletHistory = require('../Model/WalletHistory');
const walletService = require('../Service/WalletService')
const {findWalletByUser, findWalletHistoryById, findWalletHistories} = require('../Service/WalletService')
const { responsecodes } = require('../Constants/ResponseCodes')

const fundWallet = async (req, res) => {

    const { amount } = req.body;
    const user = req.user;
    try {
        // Call the fundWallet method of WalletService
        const result = await walletService.fundWallet(user._id, amount);

        if (result.success) {
            return res.status(responsecodes.SUCCESS).json({ success: true, message: result.message, wallet: result.wallet });
        } else {
            return res.status(responsecodes.BAD_REQUEST).json({ success: false, message: result.message });
        }
    } catch (error) {
        console.error('Error funding wallet:', error);
        return res.status(responsecodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
    }
}

// Debit Wallet
const debitWallet = async (req, res) => {
    try {
        const { amount } = req.body;
        const user = req.user;

        // Call the debitWallet method of WalletService
        const result = await walletService.debitWallet(user._id, amount);

        if (result.success) {
            return res.status(responsecodes.SUCCESS).json({ success: true, message: result.message, wallet: result.wallet });
        } else {
            return res.status(responsecodes.BAD_REQUEST).json({ success: false, message: result.message });
        }
    } catch (error) {
        console.error('Error debiting wallet:', error);
        return res.status(responsecodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
    }
};

const getWalletHistory = async (req, res) => {
    try {
        const wallet = await findWalletByUser(req.user._id)
        const walletHistory = await findWalletHistoryById(wallet._id)
        if(walletHistory.success){
            res.status(responsecodes.SUCCESS).json(walletHistory.data.reverse())
        } else {
            res.status(walletHistory.code).json(walletHistory.data)
        }
    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json( error );
    }
}

const getAllWalletHistories = async (req, res) => {
        const histories = await findWalletHistories()
        if(histories.success){
            res.status(histories.code).json(histories.data.reverse())
        } else {
            res.status(histories.code).json(histories.data)
        }
}

const getAllWallet = async(req, res) => {
    try {
        const allWallet = await walletService.findAllWallet()
        if(allWallet.success){
            res.status(allWallet.code).json(allWallet.data)
        } else {
            res.status(allWallet.code).json(allWallet.data)
        }
    } catch (error) {
        if(error.data){
            res.status(error.code).json(error.data)
        } else{
            res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
        }

    }
}


// const getSumWalletHistory = async (req, res)=> {
//     try {
//         const wallet = await findWalletByUser(req.user._id)
//         const walletHistory = await walletService.sumWalletHistory(wallet._id)
//         res.status(responsecodes.SUCCESS).json(walletHistory)
//     } catch (error) {
//         res.status(responsecodes.BAD_REQUEST).json({ message: "Error occured", error });
//     }
// }

module.exports = { fundWallet, debitWallet, getWalletHistory, getAllWalletHistories, getAllWallet };

