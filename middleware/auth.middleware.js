import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import blacklistTokenModel from "../models/blacklistToken.model.js";
import captainModel from "../models/captain.model.js";

export const authUserToken = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    const isBlackListed = await blacklistTokenModel.findOne({token});
    console.log('isBlackListed: ' + isBlackListed)

    if (isBlackListed) {
        return res.status(401).json({message: 'Unauthorized'})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            res.status(401).json({message: 'Unauthorized'})
        }
        req.user = user;
        return next();
    } catch (e) {
        return res.status(401).json({message: 'Unauthorized'})
    }
}

export const authCaptainToken = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: "Unauthorized"})
    }

    const isBlacklisted = await blacklistTokenModel.findOne({token})
    if (isBlacklisted) {
        return res.status(401).json({message: "Unauthorized"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain
        console.log('req.captain: ' + req.captain)
        next();
    } catch (e) {
        res.status(401).json({message: 'Unauthorized'})
    }
}
