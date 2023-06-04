const { responsecodes } = require("../Constants/ResponseCodes");
const { findWalletByUser } = require("../Service/WalletService")

const getWallet = async (req, res) => {
    try {
        const response = await findWalletByUser(req.user._id)
        console.log(response)
        res.status(responsecodes.SUCCESS).json(response);
    } catch (error) {
        res.status(responsecodes.BAD_REQUEST).json({ message: "Error occured", error });
    }
}

module.exports = {getWallet}