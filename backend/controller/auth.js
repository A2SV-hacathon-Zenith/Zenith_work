const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')

// @desc Register User
// @route POST /api/v1/auth/register
// @access public 
exports.register = asyncHandler( async (req, res, next) => {
    const {name, email, password, role, address, phone, website} = req.body
    
    // create user
    const user = await User.create({
        name,
        email,
        password,
        role,
        address,
        phone,
        website
    })

    // Create token
    const token = user.getSignedJwtToken()

    res.status(200).json({success: true, token})
})


// @desc Login User
// @route POST /api/v1/auth/login
// @access public 
exports.login = asyncHandler( async (req, res, next) => {
    const {email, password} = req.body
    
    // validate email and password
    if (!email || !password) {
        return next(new ErrorResponse('please provide an email and password', 400))
    }

    // check for user
    const user = await User.findOne({email}).select('+password')

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    // check if password matches
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    // Create token
    const token = user.getSignedJwtToken()

    res.status(200).json({success: true, token})
})