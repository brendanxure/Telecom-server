const express = require('express');
const { getWallet } = require('../Controller/WalletCont');
const { fundWallet, debitWallet } = require('../Controller/WalletController')
const { validateToken } = require('../Middleware/UserAuth')
const router = express.Router()

router.use(validateToken);
router.post(('/fund-wallet'), fundWallet)
router.post(('/debit-wallet'), debitWallet)
router.get(('/get-wallet'), getWallet)


module.exports = router