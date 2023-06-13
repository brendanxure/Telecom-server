const { responsecodes } = require("../Constants/ResponseCodes")
const DataPlan = require("../Model/DataPlan")


const BuyData = async(network, size, unit, duration, type, amount) => {
    try {
        const dataPlan = await DataPlan.create({network, size, unit, duration, type, amount})
        return {code: responsecodes.SUCCESS, success: true, message: 'DataPlan Created Successfully', data: dataPlan}
    } catch (error) {
        return {code: responsecodes.BAD_REQUEST, success:false, message: 'Error', data: error}
    }
}

module.exports = {BuyData}