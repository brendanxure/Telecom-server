const express = require('express');
const { fundWallet, debitWallet, getWalletHistory } = require('../Controller/WalletController')
const { validateToken } = require('../Middleware/UserAuth')
const router = express.Router()

router.use(validateToken);
router.post(('/fund-wallet'), fundWallet)
router.post(('/debit-wallet'), debitWallet)
router.get(('/get-wallet-history'), getWalletHistory)


module.exports = router