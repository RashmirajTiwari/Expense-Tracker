const { json } = require('body-parser');
const SignUp=require('../Model/signUpModel')
const bcrypt=require('bcrypt');
exports.postLogin=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    
    SignUp.findAll({where:{email:email}}).
    then(user=>{
    
        bcrypt.compare(password,user[0].password,(err,result)=>{
            if(err){
                res.status(500).json({success:true,message:"something went wrong"});
            }
            if(result==true){
                res.status(200).json({success:true,message:"Login Successfully"});
            }else{
               return res.status(401).json({message:"incorrect password"});
            }

        })
        
    })
    .catch(err=>{
        console.log("kkkk "+err)
        res.status(404).json({message:"Email doesn't exist"});
    })

}