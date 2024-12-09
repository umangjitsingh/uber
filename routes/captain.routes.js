import express from "express";
import {body} from "express-validator";
import {registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain} from "../controllers/captain.controller.js";
import {authCaptainToken} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min: 2}).withMessage('enter a valid name'),
    body('password').isLength({min: 6}).withMessage("Password must have 6 characters"),
    body('vehicle.color').isLength({min: 3}).withMessage("Color must have 3 characters"),
    body('vehicle.plate').isLength({min: 3}).withMessage("Plate must have 3 characters"),
    body('vehicle.capacity').isInt({min: 1}).withMessage("Capacity must be at least 1"),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'bicycle']).withMessage("Invalid vehicle type")
], registerCaptain);

router.post(('/login'),[
    body('email').isEmail().withMessage('Enter a valid email.'),
    body('password').isLength({min:6}).withMessage('Please enter at least 6 characters. ')
],loginCaptain)

router.get('/profile',authCaptainToken,getCaptainProfile);

router.get('/logout',authCaptainToken,logoutCaptain)

export default router;