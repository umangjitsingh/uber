import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String, required: true, minlength: [2, "First Name must be at least 2 characters long"],
        }, lastname: {
            type: String, minlength: [2, "Last Name must be at least 2 characters long"],
        }
    },
    email: {
        type: String, required: true, unique: true, minlength: [6, 'Email must be 6 characters long.']
    },
    password: {
        type: String, required: true, select: false,
    },
    socketId: {
        type: String,
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
}
userSchema.methods.comparePassword=async function (password){
    return await bcrypt.compare(password,this.password)
}
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10);
}

const userModel= mongoose.model('User',userSchema)
export default userModel;


