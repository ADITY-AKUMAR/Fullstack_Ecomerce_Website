import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const RegisterController=async(req,res) => {
  try{
    const {name,email,password,phone,address}=req.body
    //validation
    if(!name){
      return res.send({error:'Name is Required'})
    }
    if(!email){
      return res.send({error:'Email is Required'})
    }
        if(!password){
      return res.send({error:'Password is Required'})
    }
        if(!phone){
      return res.send({error:'Phone is Required'})
    }
        if(!address){
      return res.send({error:'Address is Required'})
    }
//check user
const existingUser=await userModel.findOne({email})
//check existing user
if(existingUser){
  return res.status(200).send({
    success:true,
    massage:'Alredy Register please login'
  })
}

 //register user
  const hashedPassword = await hashPassword(password)

//save 
const user=new userModel({name,email,phone,address,password:hashedPassword}).save();
res.status(201).send({
  success:true,
  massage:"User Register Successfully",
  user,
});

  }catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      massage:'Error in Registeration',
      error,
    })
  }
};
export const LoginController = async(req,res)=>{
  try{
    const {email,password}=req.body
    //validation
    if(!email||!password){
      return res.status(404).send({
        success:false,
        massage:'Invalid email or password',
        user,
      })
    }
    //check user
    const user=await userModel.findOne({email})
    if(!user){
      return res.status(404).send({
        success:false,
        massage:'Email is not register'
      })
    }
    const match =await comparePassword(password,user.password)
    if(!match){
      return res.status(200).send({
        success:false,
        massage:'Invalid Password'
      });
    }
    const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
      expiresIn:'7d',
    });
res.status(200).send
({
  success:true,
  massage:'Login Successfully',
  user:{
    name:user.name,
    email:user.email,
    phone:user.phone,
    user:user.address,
  },
  token,
});


 }catch (error){
    console.log(error)
    res.status(500).send({
      success:false,
      massage:'Error in Login',
      error
    })
  }
};

//test controller
export const testController=(req,res) =>{  
    res.send("protected Route");
};