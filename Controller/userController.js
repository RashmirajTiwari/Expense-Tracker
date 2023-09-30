const SignUp=require('../Model/userModel')
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

      const user =  SignUp.findOne({where : { email }});

      console.log("HHHH "+user.email)
      console.log(user.email===email)
      console.log(user.email)

      if(user.email===email){
        res.status(501).json({message:"Email Already Exist!!!"});
      }else{
        await SignUp.create({
          name:name,
          email:email,
          password:hash,
          }
        ).then(result=>{
          res.status(200).json({result:result});
        }).catch(err=>{
          res.status(504).json({message:"Something went Wrong"});
        })
      }
      
     

    })
    

}