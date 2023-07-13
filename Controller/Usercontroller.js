const bcrypt = require('bcryptjs')
const User = require('../Model/User')
const jwt = require('jsonwebtoken')
const walletService = require('../Service/WalletService')
const { json } = require('express')
const { responsecodes } = require('../Constants/ResponseCodes')

//SIGN UP/REGISTER/CREATE A NEW ACCOUNT

const Register = async (req, res) => {
    const { username, email, phonenumber, address, password, referral } = req.body

    if (!username) {
        res.status(400).json('Username required')
    }
    if (!email) {
        res.status(400).json('Email required')
    }
    if (!phonenumber) {
        res.status(400).json('Phonenumber required')
    }
    if (!password) {
        res.status(400).json('Password required')
    }

    if (referral === username) {
        res.status(400).json(`You can't be your referral`)
    }

    // If Email Already exist
    const usedEmail = await User.findOne({ email: email })
    if (usedEmail) {
        res.status(400).json('Email already exist')
    }

    // if Username Already Exist
    const usedUsername = await User.findOne({ username: username })
    if (usedUsername) {
        res.status(400).json('Username already exist')
    }

    // if Phonenumber Already Exist
    const usedPhonenumber = await User.findOne({ phonenumber: phonenumber })
    if (usedPhonenumber) {
        res.status(400).json('Phonenumber already exist')
    }

    //hashpassword
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create User
    const newUser = await User.create({
        username: username.trim(),
        email: email.trim(),
        password: hashedPassword,
        phonenumber: phonenumber.trim(),
        address: address.trim(),
        referral: referral.trim()
    })

    // Create wallet for the user
    const wallet = await walletService.createWallet(newUser._id);

    const response = {
        username: newUser.username,
        email: newUser.email,
        phonenumber: newUser.phonenumber,
        wallet: wallet.balance,
    }

    try {
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}

// LOGIN

const Login = async (req, res) => {

    const { email, password } = req.body

    //Input no completely filled
    if (!email || !password) {
        res.json('Please fill input completely')
    }

    // Incorrect Email
    const user = await User.findOne({ email: email.trim() })
    if (!user) {
        res.status(400).json('Email not registered')
    }

    const userPassword = await bcrypt.compare(password, user.password)

    if (user && userPassword) {

        // Get Wallet Details
        const wallet = await walletService.findWalletByUser(user._id);

        const { password, phonenumber, address, ...others } = user._doc
        res.status(200).json({ ...others, walletBalance: wallet.balance, accessToken: generateToken(user._id, user.isAdmin) })
    } else {
        res.status(400).json('Incorrect Password')
    }
}

const generateToken = (id, admin) => {
    return jwt.sign({ id, admin }, process.env.JWT_SECRET, { expiresIn: 3600 })
}


//get all user
const getAllUser = async(req, res) => {
    try {
        const allUsers = await User.find()
        if(!allUsers) {
            res.status(responsecodes.NOT_FOUND).json('No user found')
        }
        res.status(responsecodes.SUCCESS).json(allUsers)
    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }
}
module.exports = {
    Register, Login, getAllUser
}