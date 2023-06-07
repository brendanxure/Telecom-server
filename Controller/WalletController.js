const Wallet = require('../Model/Wallet');
const WalletHistory = require('../Model/WalletHistory');
const walletService = require('../Service/WalletService')
const {findWalletByUser, findWalletHistoryById} = require('../Service/WalletService')
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
        res.status(responsecodes.SUCCESS).json([...walletHistory.reverse()])
    } catch (error) {
        res.status(responsecodes.BAD_REQUEST).json({ message: "Error occured", error });
    }
}

module.exports = { fundWallet, debitWallet, getWalletHistory };

