const Wallet = require('../Model/Wallet');

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
module.exports = { createWallet, findWalletByUser };