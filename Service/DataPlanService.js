const { responsecodes } = require("../Constants/ResponseCodes")
const DataPlan = require("../Model/DataPlan")

const CreateDataPlan = async ( network, planId, planName, volume, unit, validity, type, amount ) => {
    try {
        const dataPlan = await DataPlan.create({ network, planId, planName, volume, unit, validity, type, amount })
        return {code: responsecodes.SUCCESS, success: true, message: 'DataPlan created successfully', data: dataPlan}
    } catch (error) {
        return {code: responsecodes.BAD_REQUEST, success:false, message: 'Error', data: error}
    }
}

const GetAllDataPlans = async () => {
    try {
        const dataPlans = await DataPlan.find()
        return {code: responsecodes.SUCCESS, success: true, message: 'Fetched all data plans from DB', data: dataPlans}
    } catch (error) {
        return {code: responsecodes.INTERNAL_SERVER_ERROR, success: false, message: 'Error occured', data: error}
    }
}

const GetDataPlanByID = async (id) => {
    try {
        const dataPlan = await DataPlan.findById(id)
        if (!dataPlan) {
            return {code: responsecodes.NOT_FOUND, success: false, message: 'Error', data: {Errormessage: 'Data plan not found'}}
        }
        return {code: responsecodes.SUCCESS, success: true, message: 'Fetched data plan from DB', data: dataPlan}
    } catch (error) {
        return {code: responsecodes.INTERNAL_SERVER_ERROR, success: false, message: 'Error', data: error}
    }
}

const UpdateDataPlanByID = async (id, dataUpdate) =>  {
    try {
        const dataPlan = await DataPlan.findByIdAndUpdate(id, dataUpdate, {new: true})
        if (!dataPlan) {
            return {code: responsecodes.NOT_FOUND, success: false, message: 'Error', data: {Errormessage: 'Data plan not found'}}
        }
        return {code: responsecodes.SUCCESS, success: true, message: 'Data plan updated', data: dataPlan}
    } catch (error) {
        return {code: responsecodes.INTERNAL_SERVER_ERROR, success: false, message: 'Error', data: error} 
    }
}

const DeleteDataPlanByID = async (id) => {
    try {
        const dataPlan = await DataPlan.findByIdAndDelete(id)
        if (!dataPlan) {
            return {code: responsecodes.NOT_FOUND, success: false, message: 'Error', data: {Errormessage: 'Data plan not found'}}
        }
        return {code: responsecodes.SUCCESS, success: true, message: 'Data plan deleted', data: {id: id + 'is deleted'}}
    } catch (error) {
        return {code: responsecodes.SUCCESS, success: true, message: 'Error', data: error}
    }
}
const BuyData = async( network, planId, planName, volume, unit, validity, type, amount ) => {
    try {
        const dataPlan = await DataPlan.create({ network, planId, planName, volume, unit, validity, type, amount })
        return {code: responsecodes.SUCCESS, success: true, message: 'DataPlan Created Successfully', data: dataPlan}
    } catch (error) {
        return {code: responsecodes.BAD_REQUEST, success:false, message: 'Error', data: error}
    }
}

module.exports = {BuyData, CreateDataPlan, GetAllDataPlans, GetDataPlanByID, UpdateDataPlanByID, DeleteDataPlanByID}