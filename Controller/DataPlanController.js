const { responsecodes } = require("../Constants/ResponseCodes")
const { BuyData, CreateDataPlan, GetAllDataPlans, GetDataPlanByID, UpdateDataPlanByID, DeleteDataPlanByID } = require("../Service/DataPlanService")
const { debitWallet } = require("../Service/WalletService")
const DataPlan = require('../models/DataPlan'); //


const CreateDataPackage = async (req, res) => {
    const { network, size, unit, duration, type, amount } = req.body
    const newDataPlan = await CreateDataPlan( network, size, unit, duration, type, amount)
    if (newDataPlan.success) {
        res.status(newDataPlan.code).json(newDataPlan.data)
    } else {
        res.status(newDataPlan.code).json(newDataPlan.data)
    }
}

const GetAllDataPackage = async (req, res) => {
    const dataPlans = await GetAllDataPlans()
    if (dataPlans.success) {
        res.status(dataPlans.code).json(dataPlans.data)
    } else {
        res.status(dataPlans.code).json(dataPlans.data)
    }
}

const GetDataPackageByID = async (req, res) => {
    const { id } = req.params
    const dataPlan = await GetDataPlanByID(id)
    if (dataPlan.success) {
        res.status(dataPlan.code).json(dataPlan.data)
    } else {
        res.status(dataPlan.code).json(dataPlan.data)
    }
}

const UpdateDataPackageByID = async (req, res) => {
    const { id } = req.params
    const updateDataPlan = await UpdateDataPlanByID(id, req.body)
    if (updateDataPlan.success) {
        res.status(updateDataPlan.code).json(updateDataPlan.data)
    } else {
        res.status(updateDataPlan.code).json(updateDataPlan.data)
    }
    // try {
    //     const dataPlan = await DataPlan.findByIdAndUpdate(req.params.id, req.body, {
    //         new: true,
    //     });
    //     if (!dataPlan) {
    //         return res.status(404).json({ error: 'Data plan not found' });
    //     }
    //     res.json(dataPlan);
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
}

const DeleteDataPackageByID = async (req, res) => {
    const { id } = req.params
    const dataPlan = await DeleteDataPlanByID(id)
    if (dataPlan.success) {
        res.status(dataPlan.code).json(dataPlan.data)
    } else {
        res.status(dataPlan.code).json(dataPlan.data)
    }
    // try {
    //     const dataPlan = await DataPlan.findByIdAndDelete(req.params.id);
    //     if (!dataPlan) {
    //         return res.status(404).json({ error: 'Data plan not found' });
    //     }
    //     res.json({ message: 'Data plan deleted successfully' });
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
}

const DataPackage = async (req, res) => {
    const user = req.user
    const { network, size, unit, duration, type, amount } = req.body
    const dataPurchased = await BuyData(network, size, unit, duration, type, amount)
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

module.exports = { DataPackage, CreateDataPackage, UpdateDataPackageByID, GetDataPackageByID, GetAllDataPackage, Delete }