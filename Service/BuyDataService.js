const uuid = require('uuid');
const BuyData = require('../Model/BuyData');
const GloDataResponseLog = require('../Model/GloDataResponseLog');
const { responsecodes } = require('../Constants/ResponseCodes');

const initialiseGloBuyData = async (userId, amount, msisdn, dataplanId) => {
    try {
        const ud = uuid.v4();
        const transId = ud.replace(/-/g, '').substring(0, 18);
        const buydata = await BuyData.create({ user: userId, dataPlan: dataplanId, transactionId: transId, amount: amount, msisdn: msisdn });
        return buydata;
    } catch (error) {
        console.log(error)
        throw error;
    }
};

const updateBuyDataStatus = async (buydata, status) => {
    try {
        buydata.status = status;
        await buydata.save();
        return { success: true, message: 'Buy Data status updated successfully', status: status };
    } catch (error) {
        console.log('An error occurred while updating the buy data status', error);
        return { success: false, message: 'An error occurred while updating the buy data status  due to ' + error };
    }
};

const createGloDataResponseLog = async (data) => {
    try {
        const responseLog = await GloDataResponseLog.create(data);
        return { data: responseLog, message: 'Response Log created sucessfully' };
    } catch (error) {
        console.log('Failed to create GloDataResponseLog', error);
        return { success: false, message: 'Failed to create GloDataResponseLog due to ' + error };

    }
}

const findByTransactionId = async (transactionId) => {
    try {
        const buyData = await BuyData.findOne({ transactionId: transactionId });
        if (!buyData) {
            return { code: responsecodes.NOT_FOUND, success: false, message: 'No data purchase found with the provided transaction Id' };
        }
        return { code: responsecodes.SUCCESS, success: true, message: 'Data Purchase found successfully', data: buyData };
    } catch (error) {
        return { code: responsecodes.INTERNAL_SERVER_ERROR, success: false, message: 'An error' + error + 'occurred while finding the data purchase' };
    }
};

const findAllGloDataTransactions = async () => {
    try {
        const gloDataTransactions = await BuyData.find()
        if(!gloDataTransactions){
            return {code: responsecodes.NOT_FOUND, success: false, message: 'No glo data transaction found'}
        }
        return {code: responsecodes.SUCCESS, success: true, message: 'Glo Data transaction found successfully', data: gloDataTransactions}
    } catch (error) {
        return {code: responsecodes.INTERNAL_SERVER_ERROR, success: false, message: 'An error' + error + 'occured while find Glo Data transactions'}
    }
}


module.exports = { initialiseGloBuyData, updateBuyDataStatus, createGloDataResponseLog, findByTransactionId, findAllGloDataTransactions }