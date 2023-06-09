const paymentService = require('../Service/PaymentService')
const axios = require('axios')
const walletService = require('../Service/WalletService')
const { responsecodes, paymentstatus } = require('../Constants/ResponseCodes');


const InitializePaystackPayment = async (req, res) => {
    const { amount } = req.body;
    const user = req.user;
    const payment = await paymentService.initialisePayment(user._id, amount);
    const form = {
        email: user.email,
        amount: amount * 100,
        currency: "NGN",
        reference: payment.reference,
        callback_url: "http://localhost:3000/admin/fund-wallet"
    };
    const headers = {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    };

    try {
        const response = await axios.post("https://api.paystack.co/transaction/initialize", form, { headers });
        return res.status(responsecodes.SUCCESS).json(response.data);
    } catch (error) {
        return res.status(responsecodes.INTERNAL_SERVER_ERROR).json({ message: "Error occured", error });
    }
};


const VerifyPaystackPayment = async (req, res) => {
    const { reference } = req.params;
    const headers = {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
    };
    try {
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, { headers });
        if (response.data.data.status === 'success') {
            const verifyPayment = await paymentService.findPaymentByReference(reference)
            if (verifyPayment.success) {
                if (verifyPayment.data.status === 'completed') {
                    return res.status(responsecodes.DUPLICATE).json({ message: 'Transaction already completed ', success: true });
                }
                const payment = verifyPayment.data;
                const result = await walletService.fundWallet(payment.user, payment.amount);
                if (result.success) {
                    await paymentService.updatePaymentStatus(verifyPayment.data, paymentstatus.COMPLETE);
                    return res.status(responsecodes.SUCCESS).json({ message: 'Transaction was successful', success: true, walletbalance: result.wallet?.balance });
                }
            }
            else {
                return res.status(verifyPayment.code).json({ message: verifyPayment.message });
            }

        } else {

            await paymentService.updatePaymentStatus(verifyPayment.data, paymentstatus.FAILED)
            return res.status(responsecodes.BAD_REQUEST).json({ message: 'Transaction was not successful' });
        }

    } catch (error) {
        return res.status(responsecodes.INTERNAL_SERVER_ERROR).json({ message: error, error });
    }
};

module.exports = { InitializePaystackPayment, VerifyPaystackPayment }