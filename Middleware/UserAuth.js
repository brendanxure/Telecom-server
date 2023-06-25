const jwt = require('jsonwebtoken')
const User = require('../Model/User')


const validateToken = async (req, res, next) => {
    let accessToken
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        try {

            //Get AccessToken from header
            accessToken = authHeader.split(' ')[1]

            // Verify AccessToken
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET, (err, res)=> {
                if (err) {
                    return 'token expired'
                }
                return res
            })

            //if token has expired
            if (decoded === 'token expired') {
                res.status(401).json("token expired")
            }

            // Get User from the AccessToken
            const user = await User.findById(decoded.id).select('-password')
            if (!user) {
                res.status(400).json('Token is invalid')
            }
            req.user = user;

            next()

        } catch (error) {

            res.status(400).json('Not authorized because ' + error)
        }
    }

    if (!accessToken) {
        res.status(401).json('Not authorized, no Access Token')
    }
}

const validateTokenForAdmin = (req, res, next) => {
    validateToken(req, res, ()=> {
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(401).json("You are not authorized, Not an admin")
        }
    })
}

module.exports = { validateToken, validateTokenForAdmin }