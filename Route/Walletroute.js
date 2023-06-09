const express = require('express');
const { fundWallet, debitWallet, getWalletHistory, getAllWalletHistories, getAllWallet } = require('../Controller/WalletController')
const { validateToken, validateTokenForAdmin } = require('../Middleware/UserAuth')
const router = express.Router()


router.post(('/fund-wallet'),validateToken, fundWallet)
router.post(('/debit-wallet'), validateToken, debitWallet)
router.get(('/get-wallet-history'), validateToken, getWalletHistory)
router.get(('/get-all-wallet-histories'), validateTokenForAdmin, getAllWalletHistories)
router.get(('/get-all-wallet'), validateTokenForAdmin, getAllWallet)

module.exports = router