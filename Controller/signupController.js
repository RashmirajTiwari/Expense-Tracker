
exports.postSignUp=(req,res,next)=>{

    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    res.json({name:name,email:email,password:password});

}