const express = require('express')
const { GetAllDataPackage, CreateDataPackage, GetDataPackageByID, UpdateDataPackageByID, DeleteDataPackageByID } = require('../Controller/DataPlanController')
const { validateTokenForAdmin } = require('../Middleware/UserAuth')

const router = express.Router()

router.use(validateTokenForAdmin)
router.post(('/create-dataplan'), CreateDataPackage)
router.get(('/get-all-dataplan'), GetAllDataPackage)
router.get(('/get-dataplan/:id'), GetDataPackageByID)
router.put(('/update-dataplan/:id'), UpdateDataPackageByID)
router.delete(('/delete-dataplan/:id'), DeleteDataPackageByID)

module.exports = router