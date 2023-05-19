const jwt = require('jsonwebtoken')
const User = require('../Model/User')


const protect = async(req, res, next) => {
    let accessToken

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Get AccessToken from header
            accessToken = req.headers.authorization.split(' ')[1]

            // Verify AccessToken
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)

            // Get User from the AccessToken
            req.user = await User.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            res.status(400).json('Not authorized')            
        }
    }

    if(!accessToken) {
        res.status(401).json('Not authorized, no Access Token')
    }
}

module.exports = {protect}