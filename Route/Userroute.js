const express = require('express')
const { Register, Login, getAllUser } = require('../Controller/Usercontroller')
const { validateTokenForAdmin } = require('../Middleware/UserAuth')

const router = express.Router()


router.post(('/register'), Register)
router.post(('/login'), Login)
router.get(('/get-all-user'), validateTokenForAdmin, getAllUser)

module.exports = router