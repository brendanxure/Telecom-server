const uuid = require('uuid');
const FundWalletPayment = require('../Model/FundWalletPayment');
const { responsecodes } = require('../Constants/ResponseCodes');



const initialisePayment = async (userId, amount) => {
    try {

        // generate a unique reference
        const reference = uuid.v4();
        const payment = await FundWalletPayment.create({ user: userId, reference: reference, amount: amount, currency: 'NGN', });
        return payment;
    } catch (error) {
        throw error;
    }
};


const findPaymentByReference = async (reference) => {
    try {
        const payment = await FundWalletPayment.findOne({ reference: reference });
        if (!payment) {
            return { code: responsecodes.INTERNAL_SERVER_ERROR, success: false, message: 'No payment found with the provided reference' };
        }
        return { code: responsecodes.SUCCESS, success: true, message: 'Payment found successfully', data: payment };
    } catch (error) {
        return { code: responsecodes.INTERNAL_SERVER_ERROR, success: false, message: 'An error' + error + 'occurred while finding the payment' };
    }
};


const updatePaymentStatus = async (payment, status) => {
    try {
        payment.status = status;
        await payment.save();
        return { success: true, message: 'Payment status updated successfully' };
    } catch (error) {
        console.log('An error occurred while updating the payment status', error);
        return null;
    }
};

module.exports = { initialisePayment, updatePaymentStatus, findPaymentByReference };