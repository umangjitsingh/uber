import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './db/db.js';
import userRoutes from "./routes/user.routes.js";
import cookieParser from 'cookie-parser'

connectDB()
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.get('/',(req,res)=>res.send("hi uber"))
app.use('/users',userRoutes)

export default app;