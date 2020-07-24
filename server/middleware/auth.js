const jwt = require('jsonwebtoken');
const User=require("./../modules/users")


 function authenticate(req,res,next){
  let header=req.headers.authorization;
  if (header) {
    let token=header.split(" ")[1];

    jwt.verify(token,process.env.JWT_SECRET_TOKEN,function (err,decoded){ 
      if(err){  
        if (err.name==="TokenExpiredError") {
          res.status(400).json({
            error:true,
            name:"TokenExpiredError"
          })
          
        }else{
          res.status(400).json({
            error:true,
            msg:"invalid access"
          })

        }
      }else{
        req.userEmail=decoded.email
        console.log(req.userEmail);
        
        User.findOne({email:req.userEmail},(err,user)=>{
          if (user) {
            req.user=user
            next();
          }else{
            res.status(400).json({
              error:err,
              msg:"Access denied:You have no access to this data no user"
            });
          }
        })
      }
     })
    // console.log(token);
    
  } else{
    res.status(400).json({
      error:true,
      msg:"Access denied:You have no access to this data"
    });
  }
 }

 module.exports={
   authenticate
 }
