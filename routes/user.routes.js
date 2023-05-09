const express=require("express");
const {UserModel}=require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userRouter=express.Router();

userRouter.post("/signup",async (req,res)=>{
 const {Email,Password,ConfirmPassword}=req.body;
 try {
  const exist=await UserModel.find({Email});
  if(exist.length>0){
   res.send({"msg":"User already registered, Please Login"});
  }else{
   bcrypt.hash(Password, 5,async function(err, secure_password) {
   if(err){
    res.send({"err":error.message})
   }else{
    const user=new UserModel({Email,Password:secure_password,ConfirmPassword});
    await user.save();
    res.send({"msg":"User registered successfully"});
   }
});
  }
 } catch (error) {
  res.send({"err":error.message})
 }
})

userRouter.post("/login",async (req,res)=>{
 const {Email,Password}=req.body;
 try {
  const user=await UserModel.find({Email});
  if(user.length>0){
   bcrypt.compare(Password, user[0].Password, function(err, result) {
   if(result){
    var token = jwt.sign({ userID: user[0]._id }, 'masai');
    res.send({"msg":"User logged in Successfully","token":token});
   }else{
    res.send({"msg":"Invalid Credentials"});
   }
});
  }else{
   res.send({"msg":"Invalid Credentials"})
  }
 } catch (error) {
    res.send({"err":error.message})
 }

});

module.exports={
 userRouter
}