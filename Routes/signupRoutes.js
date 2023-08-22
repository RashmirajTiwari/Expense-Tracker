const signupController=require('../Controller/signupController');
const express=require('express');
const router=express.Router();

router.post('/user/SignUp',signupController.postSignUp);

module.exports=router;
