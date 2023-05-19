const bcrypt = require('bcryptjs')
const User = require('../Model/User')
const jwt = require('jsonwebtoken')


//SIGN UP/REGISTER/CREATE A NEW ACCOUNT

const Register = async(req, res)=> {
    const {username, email, phonenumber, address, password, referral} = req.body


    if(!username || !email || !phonenumber || !address || !password) {
        res.json('Please fill input completely')
    }

    if(referral === username) {
        res.status(400).json(`You can't be your referral`)
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
        username: username.trim(),
        email: email.trim(),
        password: hashedPassword,
        phonenumber: phonenumber.trim(),
        address: address.trim(),
        referral: referral.trim()
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
    const user = await User.findOne({email: email.trim()})
    if (!user) {
        res.status(400).json('Email not registered')
    }
    
    const userPassword = await bcrypt.compare(password, user.password)
    

    if (user && userPassword) {
        const {password, phonenumber, address, ...others } = user._doc
        res.status(200).json({...others, accessToken: generateToken(user._id, user.isAdmin)})
    } else {
        res.status(400).json('Incorrect Password')
    }
}

const generateToken = (id, admin) => {
    return jwt.sign({id, admin}, process.env.JWT_SECRET, {expiresIn: '7d'})
}

module.exports = {
    Register, Login
}