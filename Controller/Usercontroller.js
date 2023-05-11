const bcrypt = require('bcryptjs')
const User = require('../Model/User')


//SIGN UP/REGISTER/CREATE A NEW ACCOUNT

const Register = async(req, res)=> {
    const {username, email, phonenumber, address, password, referral} = req.body

    if(!username || !email || !phonenumber || !address || !password) {
        res.json('Please fill input completely')
    }

    // If Email Already exist
    const usedEmail = await User.findOne({email: email}) 
    if (usedEmail) {
        res.status(400).json('Email already exist')
    }

    // if Username Already Exist
    const usedUsername = await User.findOne({username: username})
    if (usedUsername) {
        res.status(400).json('Username already exist')
    }

    // if Phonenumber Already Exist
    const usedPhonenumber = await User.findOne({phonenumber: phonenumber})
    if (usedPhonenumber) {
        res.status(400).json('Phonenumber already exist')
    }

    //hashpassword
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create User
    const newUser = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
        phonenumber: phonenumber,
        address: address,
        referral: referral
    }) 

    try {
        res.status(200).json(newUser)
    } catch (error) {
        res.status(400).json(error)
    }
}

// LOGIN

const Login = async (req, res) => {
    const {email, password} = req.body

    //Input no completely filled
    if (!email || !password) {
        res.json('Please fill input completely')
    }

    // Incorrect Email
    const user = await User.findOne({email: email})
    if (!user) {
        res.status(400).json('Email not registered')
    }
    
    const userPassword = await bcrypt.compare(password, user.password)
    

    if (user && userPassword) {
        res.status(200).json({
            email: user.email,
            password: user.password 
        })
    } else {
        res.json('Incorrect Password')
    }
}

module.exports = {
    Register, Login
}