const express = require('express')
const { DataPackage } = require('../Controller/DataPlanController')
const { validateToken } = require('../Middleware/UserAuth')

const router = express.Router()

router.use(validateToken)
router.post(('/buy-data'), DataPackage)

module.exports = router