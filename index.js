const express=require("express");
const cors=require("cors");
require("dotenv").config();
const {authenticator}=require("./middlewares/authenticator");

const {connection} = require("./configs/db");
const {userRouter}=require("./routes/user.routes");
const {employeeRouter}=require("./routes/employee.routes");



const app=express();

app.use(express.json());
app.use(cors({
 origin:"*"
}));
app.use("/users",userRouter);

app.get("/",(req,res)=>{
 res.send("Welcome to Employee Management Database")
});

app.use(authenticator);
app.use("/employees",employeeRouter);



app.listen(process.env.PORT,async ()=>{
 try {
  await connection;
  console.log("db connected")
 } catch (error) {
  console.log("db not connected")
 }

 console.log(`server started at port ${process.env.PORT}`)
})