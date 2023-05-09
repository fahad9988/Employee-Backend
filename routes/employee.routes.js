const express=require("express");
const {EmployeeModel}=require("../models/employee.model");

const employeeRouter=express.Router();

employeeRouter.post("/",async (req,res)=>{
 const payload=req.body;
 try {
  const employee=new EmployeeModel(payload);
  await employee.save();
  res.send({"msg":"Employee registered successfully"})
 } catch (error) {
  res.send({"err":error.message})
 }
});

employeeRouter.get("/",async (req,res)=>{
 const {department,salary,page}=req.query;
 let queries={};
 if(department){
  queries.Department=department;
 }
 let sort;
 if(salary){
  if(salary=="asc"){
   sort=1;
  }else if(salary=="desc"){
sort=-1;
  };
 }


 
 try {
  let employees=await EmployeeModel.find({userID:req.body.userID,...queries}).limit(5);
  if(page&&sort){
   page=page-1;
   employees=await EmployeeModel.find({userID:req.body.userID,...queries}).skip(page*5).limit(5).sort({Salary:sort});
  }else if(page){
   page=page-1;
   employees=await EmployeeModel.find({userID:req.body.userID,...queries}).skip(page*5).limit(5)
  }else if(sort){
   employees=await EmployeeModel.find({userID:req.body.userID,...queries}).limit(5).sort({Salary:sort});
  }
  
  res.send({"employees":employees});
 } catch (error) {
  res.send({"err":error.message})
 }
})

employeeRouter.patch("/update/:id",async (req,res)=>{
 const {id}=req.params;
 const payload=req.body;
 try {
  const employee=await EmployeeModel.findOne({_id:id});
  const employeeID=employee.userID;
  const userID=req.body.userID;
  if(employeeID!=userID){
   res.send({"msg":"You are not authorized"})
  }else{
await EmployeeModel.findByIdAndUpdate({_id:id},payload);
res.send({"msg":"Updated successfully"})
  }
 } catch (error) {
  res.send({"err":error.message})
 }
})

employeeRouter.delete("/delete/:id",async (req,res)=>{
 const {id}=req.params;
 try {
  const employee=await EmployeeModel.findOne({_id:id});
  const employeeID=employee.userID;
  const userID=req.body.userID;
  if(employeeID!=userID){
   res.send({"msg":"You are not authorized"})
  }else{
await EmployeeModel.findByIdAndDelete({_id:id});
res.send({"msg":"Deleted successfully"})
  }
 } catch (error) {
  res.send({"err":error.message})
 }
})

module.exports={
 employeeRouter
}