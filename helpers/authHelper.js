import bcrypt from 'bcrypt';

export const hashPassword=async(password)=>{
try{
//here await for password ko hash karne ke liya
const saltRoudns = 10;
const hashedPassword =await bcrypt.hash(password,saltRoudns);
return hashedPassword;
}
catch(error){
  //here for jo bhi error aa rha hai use as is it print kardo
  console.log(error);
}
};
export const comparePassword =async(password,hashedPassword)=>{
  return bcrypt.compare(password,hashedPassword);
};


// import bcrypt from 'bcrypt';

// // Function to hash password
// export const hashPassword = async (password) => {
//   try {
//     const saltRounds = 10; // ✅ fixed typo here
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     return hashedPassword;
//   } catch (error) {
//     console.log(error); // ✅ print error to console
//   }
// };

// // Function to compare plain password with hashed password
// export const comparePassword = async (password, hashedPassword) => {
//   return bcrypt.compare(password, hashedPassword);
// };
