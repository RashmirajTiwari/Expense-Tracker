const SignUp=require('../Model/signUpModel')
exports.postSignUp=(req,res,next)=>{

    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    SignUp.create({
        name:name,
        email:email,
        password:password,
        }
      ).then(result=>{
        console.log(result);
        res.json(result);
      }).catch(err=>{
        res.status(504).json({error:"Email Already Exist!!!"});
      })

}