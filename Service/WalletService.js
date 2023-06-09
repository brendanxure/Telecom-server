const Wallet = require('../Model/Wallet');
const WalletHistory = require('../Model/WalletHistory')
const { responsecodes } = require('../Constants/ResponseCodes')
const createWallet = async (userId) => {
    try {
        const wallet = await Wallet.create({ user: userId });
        return wallet;
    } catch (error) {
        throw error;
    }
};

const findWalletByUser = async (userId) => {
    try {
        const wallet = await Wallet.findOne({ user: userId }).exec();
        return wallet;
    } catch (error) {
        throw error;
    }
};
const fundWallet = async (userId, amount) => {
    try {
        // Find the wallet
        const wallet = await findWalletByUser(userId);
        if (!wallet) {
            return { success: false, message: 'Wallet not found', code: responsecodes.NOT_FOUND };
        }
        wallet.balance += amount;
        await wallet.save();
        await createWalletHistory(wallet._id, 'Funding', amount);
        return { success: true, message: 'Wallet funded successfully', code: responsecodes.SUCCESS, wallet };
    }
    catch (error) {
        console.error('Error funding wallet:', error);
        return { success: false, message: 'Internal server error', code: responsecodes.INTERNAL_SERVER_ERROR };
    }
}

const debitWallet = async (userId, amount) => {

    try {
        // Find the wallet
        const wallet = await findWalletByUser(userId);

        if (!wallet) {
            return { success: false, message: 'Wallet not found', code: responsecodes.NOT_FOUND };
        }

        // Check if the wallet has sufficient balance
        if (wallet.balance < amount) {
            return { success: false, message: 'Insufficient balance', code: responsecodes.BAD_REQUEST };
        }

        // Decrease the wallet balance
        wallet.balance -= amount;

        // Save the wallet
        await wallet.save();

        // Create a new transaction history record
        await createWalletHistory(wallet._id, 'Withdrawal', amount);

        return { success: true, message: 'Wallet debited successfully', code: responsecodes.SUCCESS, wallet };

    } catch (error) {
        console.error('Error debiting wallet:', error);
        return { success: false, message: 'Internal server error', code: responsecodes.INTERNAL_SERVER_ERROR };
    }
}
const createWalletHistory = async (walletId, transactionType, amount) => {

    try {
        const history = await WalletHistory.create({
            walletId: walletId,
            transactionType: transactionType,
            amount: amount
        });
        return history;
    } catch (error) {
        throw error;
    }
}

const findWalletHistoryById = async (walletId) => {
    try {
        const history = await WalletHistory.find({ walletId: walletId })
        if(!history){
            return {code: responsecodes.NOT_FOUND, success: false, data: {Errormessage: 'No History'}} 
        }
        return {code: responsecodes.SUCCESS, success: true, data: history}
    } catch (error) {
        throw {code: responsecodes.INTERNAL_SERVER_ERROR, success: false, data: error}
    }
}

const sumWalletHistory = async (walletId) => {
    try {
        const data = await WalletHistory.aggregate([
            {$match : { walletId : walletId }},
            {$group: {
                _id: '$walletId',
                total: {$sum: 1}
            }}
        ])
        if(!data){
            return {code: responsecodes.NOT_FOUND, success: false, data: {Errormessage: 'No Transactions'}}
        }
        return {code: responsecodes.SUCCESS, success: true, data: data}
    } catch (error) {
        throw {code: responsecodes.INTERNAL_SERVER_ERROR, success: false, data: error}
    }
}

const findWalletHistories = async () => {
    try {
        const histories = await WalletHistory.find()
        return {code: responsecodes.SUCCESS, success: true, data: histories}
    } catch (error) {
        return {code: responsecodes.INTERNAL_SERVER_ERROR, success: false, data: error}
    }
}

const findAllWallet = async() => {
    try {
        const AllWallet = await Wallet.find()
        if(!AllWallet){
            return {code: responsecodes.NOT_FOUND, success: false, data: "No Wallet Found"}
        }
        return {code: responsecodes.SUCCESS, success: true, data: AllWallet}
    } catch (error) {
        return {code: responsecodes.INTERNAL_SERVER_ERROR, success: false, data: error}
    }
}



module.exports = { createWallet, findWalletByUser, createWalletHistory, findWalletHistoryById, fundWallet, debitWallet, sumWalletHistory, findWalletHistories, findAllWallet };