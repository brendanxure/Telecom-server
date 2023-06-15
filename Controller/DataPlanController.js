const { responsecodes } = require("../Constants/ResponseCodes")
const { BuyData } = require("../Service/DataPlanService")
const { debitWallet } = require("../Service/WalletService")
const DataPlan = require('../models/DataPlan'); //


const Create = async (req, res) => {
    try {
        const newDataPlan = await DataPlan.create(req.body);
        res.status(201).json(newDataPlan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const Find = async (req, res) => {
    try {
        const dataPlans = await DataPlan.find();
        res.json(dataPlans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const GetByID = async (req, res) => {
    try {
        const dataPlan = await DataPlan.findById(req.params.id);
        if (!dataPlan) {
            return res.status(404).json({ error: 'Data plan not found' });
        }
        res.json(dataPlan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const Update = async (req, res) => {
    try {
        const dataPlan = await DataPlan.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!dataPlan) {
            return res.status(404).json({ error: 'Data plan not found' });
        }
        res.json(dataPlan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const Delete = async (req, res) => {
    try {
        const dataPlan = await DataPlan.findByIdAndDelete(req.params.id);
        if (!dataPlan) {
            return res.status(404).json({ error: 'Data plan not found' });
        }
        res.json({ message: 'Data plan deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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

module.exports = { DataPackage, Create, Update, GetByID, Find, Delete }