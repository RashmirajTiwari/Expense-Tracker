const { json } = require('body-parser');
const SignUp=require('../Model/userModel')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

function generateAccessToken(id){
    return jwt.sign({userId:id},'secretkey');
}

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
              res.status(200).json({success:true,message:"Login Successfully",token:generateAccessToken(user[0].id),user:user[0]});
              
            }else{
               return res.status(401).json({message:"incorrect password"});
            }

        })
        
    })
    .catch(err=>{
        res.status(404).json({message:"Email doesn't exist"});
    })

}