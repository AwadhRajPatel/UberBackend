const userModel = require("../models/user.model");
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require("../models/blacklistToken.model");

// Register a new user
module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    const { fullname,email, password } = req.body;   

    // Check if Captain user with the same email already exists
    const isUserAllready = await userModel.findOne({email});
    // If user with the same email already exists, return an error
    if (isUserAllready) {
        return res.status(400).json({message: "User with the same email already exists!!!"});
    }
    
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname : fullname.firstname,
        lastname: fullname.lastname, 
        email,
        password: hashedPassword
    });

     // Generate auth token
    const token = user.generateAuthToken();

    res.status(201).json({token, user});
}; 

// Login a user
module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if (!user) {
        return res.status(401).json({message: "Invalid email User not found"});
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({message: "Invalid Password User not found"});
    }

    const token = user.generateAuthToken();
    
    res.cookie('token', token);

    res.status(200).json({token, user});
    
};

// Get all users profile
module.exports.getUsersProfile = async (req, res, next) => {
    res.status(200).json(req.user);
};

// Logout a user
module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({token});

    res.status(200).json({message: "Logout successfully"});
};

