import express from "express";
import { body } from 'express-validator';
import {registerUser, loginUser, getUserProfile, logoutUser} from "../controllers/user.controller.js";
import {authUserToken} from "../middleware/auth.middleware.js";


const router =express.Router();

router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:2}).withMessage("Firstname should contain 2 characters"),
    body('password').isLength({min:6}).withMessage("Password must have 6 characters")
],registerUser)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Password must have 6 characters')
],loginUser)

router.get('/profile',authUserToken,getUserProfile)

router.get('/logout',authUserToken,logoutUser)
export default router;
