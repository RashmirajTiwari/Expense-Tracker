const SignUp=require('../Model/signUpModel')
const bcrypt=require('bcrypt');
exports.postSignUp=(req,res,next)=>{

    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const saltRound=10;

    bcrypt.hash(password,saltRound,async(err,hash)=>{
      if(err){
        console.log(err);
      }

      await SignUp.create({
        name:name,
        email:email,
        password:hash,
        }
      ).then(result=>{
        console.log(result);
        res.json(result);
      }).catch(err=>{
        res.status(504).json({error:"Email Already Exist!!!"});
      })

    })
    

}