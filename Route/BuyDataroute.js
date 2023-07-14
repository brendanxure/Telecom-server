const express = require('express');
const { BuyDataPlan} = require('../Controller/BuyDataContoller');
const { dataTransactionByUser, dataTransactionByUserByDates, getAllGloDataTransactions } = require('../Controller/DataTransactionController');
const { validateToken, validateTokenForAdmin } = require('../Middleware/UserAuth')
const router = express.Router()

router.post(('/buy-data'), validateToken, BuyDataPlan)
router.get(('/get-data-transactions'), validateToken, dataTransactionByUser)
router.post('/data-transactions-by-dates',validateToken, dataTransactionByUserByDates)
router.get(('/get-all-glo-data-transactions'), validateTokenForAdmin, getAllGloDataTransactions)

module.exports = router