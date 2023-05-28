const express = require('express');
const { fundWallet, debitWallet } = require('../Controller/WalletController')
const { validateToken } = require('../Middleware/UserAuth')
const router = express.Router()

router.use(validateToken);
router.post(('/fund-wallet'), fundWallet)
router.post(('/debit-wallet'), debitWallet)


module.exports = router