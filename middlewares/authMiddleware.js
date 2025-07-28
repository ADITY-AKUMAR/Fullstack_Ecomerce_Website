import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//protected routes token base
export const requireSignIn = async(req,res,next) => {
  try {
    // encreption
    const decode = JWT.verify(
      req.headers.authorization,process.env.JWT_SECRET   );
      //decrept     
      req.user=decode;
  next();
  } 
  catch(error){
    console.log(error); 
  }
};

//Admin access
export const isAdmin = async(req,res,next) => {
  try{
const user = await userModel.findById(req.user._id)
if(user.role !== 1){
  return res.status(404).send({
    success:false,
    massage:'UnAuthorized Access'
  })
}
else{
  next();
}
  }catch (error){
    console.log(error);
    res.status(401).send({
    success:false,
    error,
    massage:'Error in admin middleware',
    })
  }
}