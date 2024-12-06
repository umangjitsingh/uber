import userModel, {hashPassword, generateAuthToken} from "../models/user.model.js";
import {validationResult} from "express-validator";
import createUser from '../services/user.service.js'

export const registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body)

    const {fullname, email, password} = req.body;

    const hashedPassword = await hashPassword(password);

    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });
    //     as soon as user is created we give them the token
    const token = user.generateAuthToken();

    res.status(201).json({token, user})
}

export const loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    const user = await userModel.findOne({email: email}).select('+password');


    if (!user) {
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({message: 'Invalid email or password'})
    }

    const token = user.generateAuthToken();
    res.cookie('token',token);
    console.log(token +" "+ user);

    res.status(200).json({token, user})
}

export const getUserProfile = async (req, res, next) => {
return res.status(200).json(req.user);
}










