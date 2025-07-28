import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoute.js";
import cors from 'cors';
//configure env
dotenv.config();

//database configue
connectDB();

//rest object for call
const app = express()

//meddelwares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//all routes here
app.use("/api/v1/auth",authRoutes);

//create rest api
app.get("/", (req, res)=>{
res.send("Welcome to ecomerce app");
});

//port
const PORT = process.env.PORT||8080;
//run lisen
app.listen(PORT,()=>{
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});