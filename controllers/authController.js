import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const RegisterController=async(req,res) => {
  try{
    const {name,email,password,phone,address,answer}=req.body
    //validation
    if(!name){
      return res.send({massage:'Name is Required'})
    }
    if(!email){
      return res.send({massage:'Email is Required'})
    }
        if(!password){
      return res.send({massage:'Password is Required'})
    }
        if(!phone){
      return res.send({massage:'Phone is Required'})
    }
        if(!address){
      return res.send({massage:'Address is Required'})
    }
        if(!answer){
      return res.send({massage:'answer is Required'})
    }    
//check user
const existingUser=await userModel.findOne({email})
//check existing user
if(existingUser){
  return res.status(200).send({
    success:false,
    massage:'Alredy Register please login'
  })
}

 //register user
  const hashedPassword = await hashPassword(password)

//save 
const user=new userModel({name,email,phone,address,password:hashedPassword,answer}).save();
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
    role:user.role,
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

//For forgot password 
export const forgotPasswordController = async(req, res) =>
{
  try{
    const {email,answer,newPassword} = req.body
    if(!email){
      res.status(400).send({massage:'Email is required'})
    }
    if(!answer){
      res.status(400).send({massage:'answer is required'})
    }
    if(!newPassword){
      res.status(400).send({massage:'newPassword is required'})
    }
    //check
    const user =await userModel.findOne({email,answer})
    //validation
    if(!user){
      return res.status(404).send({
        success:false,
        massage:'wrong Email Or Answer'
      })
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id,{password:hashed});
    res.status(200).send({
      success:true,
      massage:'Password Reset Successfully',
    })
  }
catch(error){
console.log(error)
res.status(500).send
({
  success:false,
  massage:'Something went wrong',
  error
})  
}
};
//test controller
export const testController=(req,res) =>{  
    res.send("protected Route");
};