import express from "express";
import { body } from 'express-validator';
import {registerUser} from "../controllers/user.controller.js";

const router =express.Router();

router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:2}).withMessage("Firstname should contain 2 characters"),
    body('password').isLength({min:6}).withMessage("password must have 6 characters")
],registerUser)

export default router;
