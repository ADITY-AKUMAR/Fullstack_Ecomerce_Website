import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
//configure env
dotenv.config();
//rest object for call
const app = express()
//create rest api
app.get("/", (req, res)=>{
res.send("Welcome to ecomerce app");
});

//port
const PORT = process.env.PORT||8080;
//run lisen
app.listen(PORT,()=>{
  console.log(`Server Running on ${PORT}`.bgCyan.white);
});