const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
 Email:{type:String,required:true},
 Password:{type:String,required:true},
 ConfirmPassword:{type:String,required:true}
});

const UserModel=mongoose.model("user",userSchema);

module.exports={
 UserModel
}