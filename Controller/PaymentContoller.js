const paymentService = require('../Service/PaymentService')
const axios = require('axios')
const walletService = require('../Service/WalletService')
const { responsecodes, paymentstatus } = require('../Constants/ResponseCodes')


const InitializePaystackPayment = async (req, res) => {
    console.log(req)
    const { amount } = req.body;
    const user = req.user;
    const payment = await paymentService.initialisePayment(user._id, amount);
    const form = {
        email: user.email,
        amount: amount,
        currency: "NGN",
        ref: payment.reference
    };
    const headers = {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    };
    try {
        const response = await axios.post("https://api.paystack.co/transaction/initialize", form, { headers });
        console.log(response)
        res.status(responsecodes.SUCCESS).json(response.data);
    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json({ message: "Error occured", error });
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
            // Verify reference 
            const result = await walletService.fundWallet(user._id, amount);
            if (result.success) {
                await paymentService.updatePaymentStatus(reference, paymentstatus.COMPLETE)
            }
            res.status(responsecodes.SUCCESS).json({ message: 'Transaction was successful' });
        } else {

            await paymentService.updatePaymentStatus(reference, paymentstatus.FAILED)
            res.status(responsecodes.BAD_REQUEST).json({ message: 'Transaction was not successful' });
        }

    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json({ message: "Error occured", error });
    }
};

module.exports = { InitializePaystackPayment, VerifyPaystackPayment }