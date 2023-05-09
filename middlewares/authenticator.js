const jwt=require("jsonwebtoken");

const authenticator=(req,res,next)=>{
 let token=req.headers.authorization;
 if(token){
  var decoded = jwt.verify(token, 'masai');
  if(decoded){
   req.body.userID=docoded.userID;
   next();
  }else{
   res.send({"msg":"Please login first"})
  }
 }else{
  res.send({"msg":"Please login first"})
 }
}

module.exports={
 authenticator
}