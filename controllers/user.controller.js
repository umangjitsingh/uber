import{hashPassword,generateAuthToken} from "../models/user.model.js";
import {validationResult} from "express-validator";
import createUser from '../services/user.service.js'

export const registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {fullname, email, password} = req.body;
    const {firstname, lastname} = fullname;

    const hashedPassword = await hashPassword(password);

    const user = await createUser({firstname,lastname,email,password:hashedPassword});
     //     as soon as user is created we give them the token
    const token = await generateAuthToken();

    res.status(201).json({token,user})

}










