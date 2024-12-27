const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const blackListTokenModel = require('../models/blacklistToken.model');
const {validationResult} = require("express-validator");

// Register captain
module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {fullname, email, password, vehicle} = req.body;

    // Check if captain with the same email already exists
    const isCaptainAllreadyExist = await captainModel.findOne({email});

    // If captain with the same email already exists, return an error
    if(isCaptainAllreadyExist){
        return res.status(400).json({error: 'Captain with the same email already exists'});
    } 

    // Hash the password
    const hashedPassword = await captainModel.hashPassword(password);

    // Create a new captain
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity, 
        vehicleType: vehicle.vehicleType      
    });

    const token = captain.generateAuthToken();
    res.status(201).json({token, captain});
}


// Login captain
module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;

    // Check if captain with the same email already exists
    const captain = await captainModel.findOne({email}).select('+password');

    // If captain with the same email already exists, return an error
    if(!captain){
        return res.status(401).json({error: 'Invalid email or password'});
    } 

    // Check if the password is correct
    const isMatch = await captain.comparePassword(password);

    // If password is not correct, return an error
    if(!isMatch){
        return res.status(400).json({error: 'Invalid email or password'});
    }

    const token = captain.generateAuthToken();
    res.cookie('token', token);

    res.status(200).json({token, captain});
}

// 
module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain);
}

// Logout captain
module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    await blackListTokenModel.create({token});
    
    res.clearCookie('token');
    res.status(200).json({message: "Logout successfully"});
}