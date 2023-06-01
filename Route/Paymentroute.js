const express = require('express');
const { InitializePaystackPayment, VerifyPaystackPayment } = require('../Controller/PaymentContoller')
const { validateToken } = require('../Middleware/UserAuth')
const router = express.Router()

router.use(validateToken);
router.post('/initialize', InitializePaystackPayment)
router.get('/verify/:reference', VerifyPaystackPayment)


module.exports = router