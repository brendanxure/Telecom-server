const express = require('express');
const { BuyDataPlan } = require('../Controller/BuyDataContoller')
const { validateToken } = require('../Middleware/UserAuth')
const router = express.Router()

router.use(validateToken);
router.post(('/buy-data'), BuyDataPlan)

module.exports = router