const uuid = require('uuid');
const Payment = require('../Model/FundWalletPayment')



const initialisePayment = async (userId, amount) => {
    try {

        // generate a unique reference
        const reference = uuid.v4();
        const payment = await Payment.create({ user: userId, reference: reference, amount: amount, currency: 'NGN', });
        return payment;
    } catch (error) {
        throw error;
    }
};


const findPaymentByReference = async (reference) => {
    try {
        const payment = await FundWalletPayment.findOne({ reference });
        if (!payment) {
            console.log('No payment found with the provided reference');
            return null;
        }
        console.log('Payment found successfully');
        return payment;
    } catch (error) {
        console.log('An error occurred while finding the payment', error);
        return null;
    }
};


const updatePaymentStatus = async (reference, status) => {
    try {
        const payment = await findPaymentByReference(reference);
        if (payment) {
            payment.status = status;
            await payment.save();
            return { success: true, message: 'Payment status updated successfully' };
        }
    } catch (error) {
        console.log('An error occurred while updating the payment status', error);
        return null;
    }
};

module.exports = { initialisePayment, updatePaymentStatus };