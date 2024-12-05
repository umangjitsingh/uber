import userModel from "../models/user.model.js";

const createUser = async ({
    fullname,email,password
})=>{
    if(!fullname.firstname || !email || !password){
        throw new Error("All fields are required")
    }
    const user = new userModel ({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password
    })
    return user;
}

export default createUser;