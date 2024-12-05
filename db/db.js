import mongoose from 'mongoose';

const connectDB = () => {
    mongoose.connect(process.env.DB_CONNECT)
        .then(() => console.log("connect to db successful"))
        .catch(error => console.log("There is some error : ", error));
}

export default connectDB;