const express = require('express')
const { GetAllDataPackage, CreateDataPackage, GetDataPackageByID, UpdateDataPackageByID, DeleteDataPackageByID } = require('../Controller/DataPlanController')
const { validateTokenForAdmin, validateToken } = require('../Middleware/UserAuth')

const router = express.Router()

router.post(('/create-dataplan'), validateTokenForAdmin, CreateDataPackage)
router.get(('/get-all-dataplan'), validateToken, GetAllDataPackage)
router.get(('/get-dataplan/:id'), validateTokenForAdmin, GetDataPackageByID)
router.put(('/update-dataplan/:id'), validateTokenForAdmin, UpdateDataPackageByID)
router.delete(('/delete-dataplan/:id'), validateTokenForAdmin, DeleteDataPackageByID)

module.exports = router