import userModel from "../models/user.model.js";

const createUser = async ({
    firstname,lastname,email,password
})=>{
    if(!firstname || !email || !password){
        throw new Error("All fields are required")
    }
    const user = new userModel ({
        fullname:{firstname,lastname},
        email,
        password
    })
    await user.save();
    return user;
}

export default createUser;