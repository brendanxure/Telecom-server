const mongoose = require('mongoose')

const DBConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB Connected Successfully")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = DBConnect