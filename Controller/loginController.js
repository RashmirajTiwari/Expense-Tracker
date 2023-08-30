const { json } = require('body-parser');
const SignUp=require('../Model/signUpModel')
exports.postLogin=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    
    SignUp.findAll({where:{email:email}}).
    then(result=>{
        const data=result[0];
        if(data.password==password){
            res.status(200).json({success:true,message:"Login Successfully"});
        }else{
           return res.status(401).json({message:"incorrect password"});
        }
    })
    .catch(err=>{
        console.log("kkkk "+err)
        res.status(404).json({message:"Email doesn't exist"});
    })

}