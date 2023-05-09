const mongoose=require("mongoose");

const employeeSchema=mongoose.Schema({
 FirstName:{type:String,required:true},
 LastName:{type:String,required:true},
 Email:{type:String,required:true},
 Department:{type:String,required:true},
 Salary:{type:Number,required:true},

});

const EmployeeModel=mongoose.model("employee",employeeSchema);

module.exports={
 EmployeeModel
}