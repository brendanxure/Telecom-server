const { responsecodes } = require("../Constants/ResponseCodes")
const {  CreateDataPlan, GetAllDataPlans, GetDataPlanByID, UpdateDataPlanByID, DeleteDataPlanByID } = require("../Service/DataPlanService")



//Create Data Plans
const CreateDataPackage = async (req, res) => {
    const { network, planName, planId, volume, unit, validity, type, amount } = req.body

    if(!network) {
        res.status(responsecodes.BAD_REQUEST).json('Please Input network')
    }

    if(!planName) {
        res.status(responsecodes.BAD_REQUEST).json('Please Input planName')
    }

    if(!planId) {
        res.status(responsecodes.BAD_REQUEST).json('Please Input planId')
    }

    if(!volume) {
        res.status(responsecodes.BAD_REQUEST).json('Please Input volume')
    }

    if(!unit) {
        res.status(responsecodes.BAD_REQUEST).json('Please Input unit')
    }

    if(!validity) {
        res.status(responsecodes.BAD_REQUEST).json('Please Input validity')
    }

    if(!type) {
        res.status(responsecodes.BAD_REQUEST).json('Please Input type')
    }

    if(!amount) {
        res.status(responsecodes.BAD_REQUEST).json('Please Input amount')
    }
    
    const newDataPlan = await CreateDataPlan(network, planName, planId, volume, unit, validity, type, amount)
    if (newDataPlan.success) {
        res.status(newDataPlan.code).json(newDataPlan.data)
    } else {
        res.status(newDataPlan.code).json(newDataPlan.data)
    }
}

//Get All Data Plan
const GetAllDataPackage = async (req, res) => {
    const dataPlans = await GetAllDataPlans()
    if (dataPlans.success) {
        res.status(dataPlans.code).json([...dataPlans.data.reverse()])
    } else {
        res.status(dataPlans.code).json(dataPlans.data)
    }
}


//Get A Data Plan
const GetDataPackageByID = async (req, res) => {
    const { id } = req.params
    const dataPlan = await GetDataPlanByID(id)
    if (dataPlan.success) {
        res.status(dataPlan.code).json(dataPlan.data)
    } else {
        res.status(dataPlan.code).json(dataPlan.data)
    }
}

// Update A Data Plan
const UpdateDataPackageByID = async (req, res) => {
    const { id } = req.params
    const updateDataPlan = await UpdateDataPlanByID(id, req.body)
    if (updateDataPlan.success) {
        res.status(updateDataPlan.code).json(updateDataPlan.data)
    } else {
        res.status(updateDataPlan.code).json(updateDataPlan.data)
    }
}

//Delete A Data Plan
const DeleteDataPackageByID = async (req, res) => {
    const { id } = req.params
    const dataPlan = await DeleteDataPlanByID(id)
    if (dataPlan.success) {
        res.status(dataPlan.code).json(dataPlan.data)
    } else {
        res.status(dataPlan.code).json(dataPlan.data)
    }
}





module.exports = {  CreateDataPackage, UpdateDataPackageByID, GetDataPackageByID, GetAllDataPackage, DeleteDataPackageByID }