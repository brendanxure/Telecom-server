const express = require('express');
const { BuyDataPlan } = require('../Controller/BuyDataContoller');
const { dataTransactionByUser, dataTransactionByUserByDates } = require('../Controller/DataTransactionController');
const { validateToken } = require('../Middleware/UserAuth')
const router = express.Router()

router.use(validateToken);
router.post(('/buy-data'), BuyDataPlan)
router.get(('/get-data-transactions'), dataTransactionByUser)
router.post('/data-transactions-by-dates', dataTransactionByUserByDates)

module.exports = router