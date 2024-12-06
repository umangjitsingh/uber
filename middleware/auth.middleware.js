import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if(!user){
            res.status(401).json({message:'Unauthorized'})
        }
        req.user=user;
        return next();
    } catch (e) {
        return res.status(401).json({message: 'Unauthorized'})
    }
}
export default authUser;