import userModel, {hashPassword, generateAuthToken} from "../models/user.model.js";
import {validationResult} from "express-validator";
import createUser from '../services/user.service.js';
import blacklistTokenModel from "../models/blacklistToken.model.js";

export const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    console.log(req.body);

    const {fullname, email, password} = req.body;
    const isUserAlreadyExists = userModel.findOne({email});
    if(isUserAlreadyExists){
        res.status(400).json({message:'User Already Exist'})
    }
    const hashedPassword = await hashPassword(password);

    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({token, user});
};

export const loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if (!user) {
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = user.generateAuthToken();
    res.cookie('token', token);

    console.log(token + " " + user);

    res.status(200).json({token, user});
};

export const getUserProfile = async (req, res, next) => {
    return res.status(200).json(req.user);
};

export const logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    try {
        await blacklistTokenModel.create({token});
        res.clearCookie('token');
        res.status(200).json({message: 'Token blacklisted and cookie cleared'});
    } catch (error) {
        console.error('Error blacklisting token:', error);
        res.status(500).json({message: 'Server error'});
    }
};










