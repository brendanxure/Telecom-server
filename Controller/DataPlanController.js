const { responsecodes } = require("../Constants/ResponseCodes")
const { BuyData, CreateDataPlan, GetAllDataPlans, GetDataPlanByID, UpdateDataPlanByID, DeleteDataPlanByID } = require("../Service/DataPlanService")
const { debitWallet } = require("../Service/WalletService")


//Create Data Plans
const CreateDataPackage = async (req, res) => {
    const { network, planName, planId, volume, unit, validity, type, amount } = req.body
    const newDataPlan = await CreateDataPlan(  network, planName, planId, volume, unit, validity, type, amount )
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

const DataPackage = async (req, res) => {
    const user = req.user
    const {  network, planName, planId, volume, unit, validity, type, amount  } = req.body
    const dataPurchased = await BuyData( network,  planName, planId, volume, unit, validity, type, amount )
    if (dataPurchased.success) {
        // call the newtork api for data

        //if api to get data was successful
        if (true) {
            const updateWalletBalance = await debitWallet(user._id, amount)
            if (updateWalletBalance.success) {
                res.status(updateWalletBalance.code).json({ message: 'Data Bought Successfully', walletBalance: updateWalletBalance.wallet?.balance })
            } else {
                res.status(updateWalletBalance.code).json({ message: updateWalletBalance.message })
            }
        }
    } else {
        return res.status(dataPurchased.code).json({ message: dataPurchased.message, error: dataPurchased.data })
    }
}

module.exports = { DataPackage, CreateDataPackage, UpdateDataPackageByID, GetDataPackageByID, GetAllDataPackage, DeleteDataPackageByID}